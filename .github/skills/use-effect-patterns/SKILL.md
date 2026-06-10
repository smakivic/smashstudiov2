# React: Avoid Unnecessary useEffect

When writing or reviewing React code, apply the following rules before reaching for `useEffect`. Effects are an escape hatch for syncing with **external systems** — not a general-purpose tool for reacting to state or prop changes.

---

## Rules

### 1. Don't use an Effect to derive state from other state or props

Calculate it directly during rendering instead.

```tsx
// ❌ Avoid
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

// ✅ Prefer
const fullName = firstName + " " + lastName;
```

### 2. Don't use an Effect to filter or transform data for rendering

Compute inline or wrap in `useMemo` if expensive.

```tsx
// ❌ Avoid
const [visibleTodos, setVisibleTodos] = useState([]);
useEffect(() => {
  setVisibleTodos(getFilteredTodos(todos, filter));
}, [todos, filter]);

// ✅ Prefer (simple)
const visibleTodos = getFilteredTodos(todos, filter);

// ✅ Prefer (expensive — use useMemo)
const visibleTodos = useMemo(
  () => getFilteredTodos(todos, filter),
  [todos, filter],
);
```

### 3. Don't use an Effect to reset state when a prop changes — use `key`

```tsx
// ❌ Avoid
useEffect(() => {
  setComment("");
}, [userId]);

// ✅ Prefer — React resets all state automatically when key changes
<Profile key={userId} userId={userId} />;
```

### 4. Don't use an Effect to handle user events

If the code runs because of a specific user interaction, put it in the event handler.

```tsx
// ❌ Avoid
useEffect(() => {
  if (product.isInCart) showNotification(`Added ${product.name}`);
}, [product]);

// ✅ Prefer
function handleBuyClick() {
  addToCart(product);
  showNotification(`Added ${product.name}`);
}
```

### 5. Don't use an Effect to send a request triggered by user action

```tsx
// ❌ Avoid
const [jsonToSubmit, setJsonToSubmit] = useState(null);
useEffect(() => {
  if (jsonToSubmit) post("/api/register", jsonToSubmit);
}, [jsonToSubmit]);

// ✅ Prefer
function handleSubmit(e) {
  e.preventDefault();
  post("/api/register", { firstName, lastName });
}
```

### 6. Don't chain Effects that only exist to trigger each other

Compute derived values and batch state updates inside a single event handler.

```tsx
// ❌ Avoid — cascading re-renders for every set call
useEffect(() => {
  if (card?.gold) setGoldCardCount((c) => c + 1);
}, [card]);
useEffect(() => {
  if (goldCardCount > 3) setRound((r) => r + 1);
}, [goldCardCount]);
useEffect(() => {
  if (round > 5) setIsGameOver(true);
}, [round]);

// ✅ Prefer — compute everything in the event handler
function handlePlaceCard(nextCard) {
  setCard(nextCard);
  if (nextCard.gold) {
    const nextCount = goldCardCount + 1;
    if (nextCount > 3) {
      setGoldCardCount(0);
      const nextRound = round + 1;
      setRound(nextRound);
      if (nextRound > 5) alert("Good game!");
    } else {
      setGoldCardCount(nextCount);
    }
  }
}
```

### 7. Don't notify parent components about state changes from an Effect

Call the parent's callback in the same event handler that updates local state.

```tsx
// ❌ Avoid
useEffect(() => {
  onChange(isOn);
}, [isOn, onChange]);

// ✅ Prefer
function updateToggle(nextIsOn) {
  setIsOn(nextIsOn);
  onChange(nextIsOn);
}
```

### 8. Don't pass data up to a parent via an Effect

Lift the fetch to the parent and pass data down as props.

```tsx
// ❌ Avoid — child fetches and pushes data up
useEffect(() => {
  if (data) onFetched(data);
}, [data, onFetched]);

// ✅ Prefer — parent fetches and passes down
function Parent() {
  const data = useSomeAPI();
  return <Child data={data} />;
}
```

### 9. Don't subscribe to an external store manually with an Effect

Use `useSyncExternalStore` instead.

```tsx
// ❌ Avoid
useEffect(() => {
  const update = () => setIsOnline(navigator.onLine);
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
  return () => {
    window.removeEventListener("online", update);
    window.removeEventListener("offline", update);
  };
}, []);

// ✅ Prefer
const isOnline = useSyncExternalStore(
  subscribe,
  () => navigator.onLine,
  () => true,
);
```

### 10. When fetching data in an Effect, always add a cleanup to prevent race conditions

```tsx
// ❌ Avoid — no cleanup, stale responses can overwrite fresh ones
useEffect(() => {
  fetchResults(query, page).then((json) => setResults(json));
}, [query, page]);

// ✅ Prefer
useEffect(() => {
  let ignore = false;
  fetchResults(query, page).then((json) => {
    if (!ignore) setResults(json);
  });
  return () => {
    ignore = true;
  };
}, [query, page]);
```

### 11. Don't put one-time app initialization logic in an Effect

Guard with a module-level flag or run it outside the component entirely.

```tsx
// ❌ Avoid — runs twice in Strict Mode
useEffect(() => {
  loadDataFromLocalStorage();
  checkAuthToken();
}, []);

// ✅ Prefer — module-level guard
let didInit = false;
useEffect(() => {
  if (!didInit) {
    didInit = true;
    loadDataFromLocalStorage();
    checkAuthToken();
  }
}, []);

// ✅ Also fine — run before the app renders
if (typeof window !== "undefined") {
  checkAuthToken();
  loadDataFromLocalStorage();
}
```

---

## Quick decision checklist

Before writing a `useEffect`, ask:

1. **Can I calculate this during rendering?** → Do it inline (or `useMemo` if slow). No Effect needed.
2. **Does this run because of a user interaction?** → Put it in the event handler.
3. **Am I resetting all state when a prop changes?** → Pass `key` instead.
4. **Am I syncing two components' state?** → Lift state up or call both setters in one handler.
5. **Am I subscribing to a browser/external API?** → Use `useSyncExternalStore`.
6. **Am I fetching data?** → Keep the Effect, but add `ignore` cleanup for race conditions, and prefer a framework's built-in data fetching or a custom `useData` hook.

Only reach for `useEffect` when you genuinely need to synchronize with something **outside React** (DOM APIs, third-party widgets, network, browser APIs) and none of the above alternatives apply.
