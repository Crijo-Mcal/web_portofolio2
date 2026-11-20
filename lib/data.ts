import "server-only";

import fs from "node:fs";
import path from "node:path";

import projectsJson from "@/data/projects.json";
import experiencesJson from "@/data/experiences.json";
import skillsJson from "@/data/skills.json";
import siteJson from "@/data/site.json";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ProjectContext = {
  label: string;
  title: string;
  text: string;
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  featured: boolean;
  category: string;
  /** Optional status shown on the featured card, e.g. "EM DESENVOLVIMENTO". */
  status?: string;
  type: string;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: string[];
  /** Path inside public/, e.g. "/assets/projects/reservaja.png". Used on the cards. */
  image: string;
  /** Optional image for the detail page (falls back to `image`). */
  detailImage: string;
  /** Empty string = button shown disabled. */
  demoUrl: string;
  repoUrl: string;
  context?: ProjectContext;
};

export type Experience = {
  type: string;
  place: string;
  period: string;
  company: string;
  role: string;
  description: string;
  areas: string[];
  /** Optional link to /projetos/<projectSlug>. */
  projectSlug?: string;
};

export type SkillLevel = "À vontade" | "Familiaridade";

export type Skill = {
  name: string;
  level: SkillLevel;
  /** Devicon path, e.g. "html5/html5-original.svg". */
  icon: string;
  /** Invert a dark icon so it is visible on the dark background. */
  invert?: boolean;
};

export type SiteInfo = {
  email: string;
  github: { label: string; url: string };
  /** Path inside public/. When the file does not exist, CV buttons are disabled. */
  cvUrl: string;
};

/* ------------------------------------------------------------------ */
/* Validation helpers — fail the build with a clear message            */
/* ------------------------------------------------------------------ */

class DataError extends Error {
  constructor(file: string, where: string, message: string) {
    super(`[${file}] ${where}: ${message}`);
    this.name = "DataError";
  }
}

type Obj = Record<string, unknown>;

function isObj(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function makeReader(file: string, where: string, obj: Obj) {
  const fail = (msg: string): never => {
    throw new DataError(file, where, msg);
  };
  return {
    fail,
    str(key: string): string {
      const v = obj[key];
      if (v === undefined) fail(`required field "${key}" is missing`);
      if (typeof v !== "string") fail(`field "${key}" must be a string`);
      if ((v as string).trim() === "") fail(`field "${key}" must not be empty`);
      return v as string;
    },
    /** String that may be empty ("" = not available yet). */
    strOrEmpty(key: string): string {
      const v = obj[key];
      if (v === undefined) fail(`required field "${key}" is missing (use "" if not available)`);
      if (typeof v !== "string") fail(`field "${key}" must be a string`);
      return v as string;
    },
    optStr(key: string): string | undefined {
      const v = obj[key];
      if (v === undefined || v === "") return undefined;
      if (typeof v !== "string") fail(`field "${key}" must be a string`);
      return v as string;
    },
    bool(key: string, fallback?: boolean): boolean {
      const v = obj[key];
      if (v === undefined && fallback !== undefined) return fallback;
      if (typeof v !== "boolean") fail(`field "${key}" must be true or false`);
      return v as boolean;
    },
    strArray(key: string): string[] {
      const v = obj[key];
      if (v === undefined) fail(`required field "${key}" is missing`);
      if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) {
        fail(`field "${key}" must be an array of strings`);
      }
      return v as string[];
    },
  };
}

function publicFileExists(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

function asArray(file: string, data: unknown): unknown[] {
  if (!Array.isArray(data)) {
    throw new DataError(file, "root", "the file must contain a JSON array");
  }
  return data;
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

function parseProjects(data: unknown): Project[] {
  const file = "data/projects.json";
  const seen = new Set<string>();

  return asArray(file, data).map((raw, i) => {
    if (!isObj(raw)) throw new DataError(file, `item ${i}`, "must be an object");
    const label = typeof raw.slug === "string" ? `item ${i} ("${raw.slug}")` : `item ${i}`;
    const r = makeReader(file, label, raw);

    const slug = r.str("slug");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      r.fail(`"slug" must be lowercase letters, numbers and hyphens (e.g. "my-project")`);
    }
    if (seen.has(slug)) r.fail(`duplicate slug "${slug}"`);
    seen.add(slug);

    const image = r.str("image");
    if (!image.startsWith("/")) r.fail(`"image" must start with "/" (e.g. "/assets/projects/${slug}.png")`);
    if (!publicFileExists(image)) r.fail(`image file not found: public${image}`);

    const detailImage = r.optStr("detailImage") ?? image;
    if (!detailImage.startsWith("/")) r.fail(`"detailImage" must start with "/"`);
    if (!publicFileExists(detailImage)) r.fail(`detailImage file not found: public${detailImage}`);

    let context: ProjectContext | undefined;
    if (raw.context !== undefined) {
      if (!isObj(raw.context)) r.fail(`"context" must be an object`);
      const c = makeReader(file, `${label}.context`, raw.context as Obj);
      context = { label: c.str("label"), title: c.str("title"), text: c.str("text") };
    }

    return {
      slug,
      number: r.str("number"),
      name: r.str("name"),
      featured: r.bool("featured", false),
      category: r.str("category"),
      status: r.optStr("status"),
      type: r.str("type"),
      shortDescription: r.str("shortDescription"),
      description: r.str("description"),
      features: r.strArray("features"),
      technologies: r.strArray("technologies"),
      image,
      detailImage,
      demoUrl: r.strOrEmpty("demoUrl"),
      repoUrl: r.strOrEmpty("repoUrl"),
      context,
    };
  });
}

/* ------------------------------------------------------------------ */
/* Experiences                                                         */
/* ------------------------------------------------------------------ */

function parseExperiences(data: unknown, projectSlugs: Set<string>): Experience[] {
  const file = "data/experiences.json";
  return asArray(file, data).map((raw, i) => {
    if (!isObj(raw)) throw new DataError(file, `item ${i}`, "must be an object");
    const label = typeof raw.company === "string" ? `item ${i} ("${raw.company}")` : `item ${i}`;
    const r = makeReader(file, label, raw);

    const projectSlug = r.optStr("projectSlug");
    if (projectSlug && !projectSlugs.has(projectSlug)) {
      r.fail(`"projectSlug" "${projectSlug}" does not match any slug in data/projects.json`);
    }

    return {
      type: r.str("type"),
      place: r.str("place"),
      period: r.str("period"),
      company: r.str("company"),
      role: r.str("role"),
      description: r.str("description"),
      areas: r.strArray("areas"),
      projectSlug,
    };
  });
}

/* ------------------------------------------------------------------ */
/* Skills & site                                                       */
/* ------------------------------------------------------------------ */

function parseSkills(data: unknown): Skill[] {
  const file = "data/skills.json";
  return asArray(file, data).map((raw, i) => {
    if (!isObj(raw)) throw new DataError(file, `item ${i}`, "must be an object");
    const r = makeReader(file, `item ${i}`, raw);
    const level = r.str("level");
    if (level !== "À vontade" && level !== "Familiaridade") {
      r.fail(`"level" must be "À vontade" or "Familiaridade"`);
    }
    return {
      name: r.str("name"),
      level: level as SkillLevel,
      icon: r.str("icon"),
      invert: r.bool("invert", false),
    };
  });
}

function parseSite(data: unknown): SiteInfo {
  const file = "data/site.json";
  if (!isObj(data)) throw new DataError(file, "root", "must be an object");
  const r = makeReader(file, "root", data);
  if (!isObj(data.github)) r.fail(`"github" must be an object with "label" and "url"`);
  const g = makeReader(file, "github", data.github as Obj);
  return {
    email: r.str("email"),
    github: { label: g.str("label"), url: g.str("url") },
    cvUrl: r.str("cvUrl"),
  };
}

/* ------------------------------------------------------------------ */
/* Public API — components read data only through these functions     */
/* ------------------------------------------------------------------ */

const projects = parseProjects(projectsJson);
const experiences = parseExperiences(experiencesJson, new Set(projects.map((p) => p.slug)));
const skills = parseSkills(skillsJson);
const site = parseSite(siteJson);

/** All projects, in file order. */
export function getProjects(): Project[] {
  return projects;
}

/** The featured project (first with "featured": true), if any. */
export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured);
}

/** Every project except the featured one, in file order. */
export function getGridProjects(): Project[] {
  const featured = getFeaturedProject();
  return projects.filter((p) => p !== featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Experiences, newest first (file order). */
export function getExperiences(): Experience[] {
  return experiences;
}

export function getSkills(): Skill[] {
  return skills;
}

export const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";

export type Site = SiteInfo & {
  cvAvailable: boolean;
  /** Opens Gmail's "new message" window with the address filled in (no mail app / system dialog needed). */
  emailUrl: string;
};

export function getSite(): Site {
  return {
    ...site,
    cvAvailable: publicFileExists(site.cvUrl),
    emailUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`,
  };
}
