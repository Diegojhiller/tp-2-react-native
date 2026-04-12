const API_BASE = "/api/tasks";

async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    let message = "Ocurrio un error en la solicitud";

    try {
      const data = await response.json();
      if (data?.error) {
        message = data.error;
      }
    } catch {
      // Si no hay JSON, usamos mensaje por defecto.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getTasks() {
  return apiRequest(API_BASE);
}

export function createTask(title) {
  return apiRequest(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

export function updateTask(id, payload) {
  return apiRequest(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function deleteTask(id) {
  return apiRequest(`${API_BASE}/${id}`, { method: "DELETE" });
}
