import { api } from "../api";
import type { Project } from "../types";

export async function getProjects(): Promise<Project[] | Error> {
  try {
    const response = await api.get("/projects");
    return response.data.data;
  } catch (error) {
    return error as Error;
  }
}

export async function getProjectById(id: number): Promise<Project | Error> {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data.data;
  } catch (error) {
    return error as Error;
  }
}

export async function createProject(
  project: Omit<Project, "id" | "ownerId" | "progress">
): Promise<Project | Error> {
  try {
    const response = await api.post("/projects", project);
    return response.data.data;
  } catch (error) {
    return error as Error;
  }
}

export async function updateProject(
  project: Project
): Promise<Project | Error> {
  try {
    const response = await api.put(`/projects/${project.id}`, project);
    return response.data.data;
  } catch (error) {
    return error as Error;
  }
}

export async function deleteProject(id: number): Promise<void | Error> {
  try {
    await api.delete(`/projects/${id}`);
  } catch (error) {
    return error as Error;
  }
}
