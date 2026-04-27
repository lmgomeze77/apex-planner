import { supabase } from "./supabase.js";

const P = "apex:";

// ── Local cache (instant reads) ───────────────────────────────
export const storage = {
  get(k, fallback = null) {
    try {
      const v = localStorage.getItem(P + k);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(P + k, JSON.stringify(v));
    } catch {}
  },
  del(k) {
    try {
      localStorage.removeItem(P + k);
    } catch {}
  },
};

// ── Supabase sync helpers ─────────────────────────────────────

/** Load tasks from Supabase, merge into localStorage, return array */
export async function loadTasksFromCloud() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at");

  if (error) {
    console.error("loadTasks:", error);
    return null;
  }

  // Normalise DB rows → app shape
  const tasks = data.map(dbToTask);
  storage.set("tasks", tasks);
  return tasks;
}

/** Load goals from Supabase (stored as a single JSON blob in user_meta) */
export async function loadGoalsFromCloud() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from("user_meta")
    .select("value")
    .eq("key", "goals")
    .maybeSingle();

  if (error) {
    console.error("loadGoals:", error);
    return null;
  }
  if (!data) return null;

  const goals = JSON.parse(data.value);
  storage.set("goals", goals);
  return goals;
}

/** Push a single task upsert to Supabase */
export async function upsertTask(task) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase.from("tasks").upsert(taskToDb(task, session.user.id));
}

/** Delete a task from Supabase by id */
export async function deleteTask(id) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase.from("tasks").delete().eq("id", String(id));
}

/** Save entire goals array to Supabase as JSON blob */
export async function saveGoalsToCloud(goals) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase.from("user_meta").upsert({
    user_id: session.user.id,
    key: "goals",
    value: JSON.stringify(goals),
    updated_at: new Date().toISOString(),
  });
}

// ── Shape converters ──────────────────────────────────────────
function taskToDb(t, userId) {
  return {
    id: String(t.id),
    user_id: userId,
    title: t.title || "",
    description: t.notes || null,
    status: t.status || "pending",
    priority: t.priority || "NORMAL",
    due_date: t.dueDate || null,
    assignee: t.category || null, // reuse assignee col for category
    updated_at: new Date().toISOString(),
  };
}

function dbToTask(row) {
  return {
    id: row.id,
    title: row.title,
    notes: row.description,
    status: row.status,
    priority: row.priority,
    dueDate: row.due_date,
    category: row.assignee || "work",
  };
}
