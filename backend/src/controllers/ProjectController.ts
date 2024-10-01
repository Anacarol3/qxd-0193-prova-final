import { Request, Response } from "express";
import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { AppDataSource } from "../ormconfig";

const validateProjectData = (data: any) => {
  const errors = [];

  if (!data.name || data.name.length < 3 || data.name.length > 100) {
    errors.push("O nome do projeto deve ter entre 3 e 100 caracteres.");
  }

  if (
    !data.description ||
    data.description.length < 10 ||
    data.description.length > 500
  ) {
    errors.push("A descrição do projeto deve ter entre 10 e 500 caracteres.");
  }

  if (data.progress < 0 || data.progress > 100) {
    errors.push("O progresso deve ser um valor entre 0 e 100.");
  }

  return errors;
};

export const listProjects = async (req: Request, res: Response) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const projects = await projectRepository.find({ relations: ["user"] });
  res.json({ data: projects });
};

export const postProject = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const projectRepository = AppDataSource.getRepository(Project);
  const user = await userRepository.findOne(req.body.ownerId);
  if (!user) {
    res.status(400).json({ error: "Usuário não encontrado." });
    return;
  }

  const errors = validateProjectData(req.body);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const project = projectRepository.create(req.body);
  await projectRepository.save(project);
  res.json({ data: project });
};

export const deleteProject = async (req: Request, res: Response) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ errors: ["Id inválido"] });
  }

  const project = await projectRepository.findOneBy({ id });
  if (!project) {
    res.status(404).json({ error: "Projeto não encontrado." });
    return;
  }

  await projectRepository.remove(project);
  res.json({ data: project });
};
