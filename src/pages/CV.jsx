import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, BookOpen, Users, Wrench, Languages, UserCheck, FileText } from 'lucide-react';
import { profile, education, experience, trainings, activities, skills, testScores, references } from '../data/profile';
import { publications } from '../data/publications';
import CopyEmail from '../components/CopyEmail';
import { LinkedInIcon } from '../components/BrandIcons';
import useTitle from '../lib/useTitle';

const Heading = ({ icon: Icon, children }) => (
  <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
    <span className="w-8 h-8 shrink-0 rounded-lg grid place-items-center bg-emerald-500/10 ring-1 ring-emerald-500/20">
      <Icon size={16} className="text-emerald-700 dark:text-emerald-400" />
    </span>
    {children}
  </h2>
);

const Entry = ({ title, org, period, children }) => (
  <div className="relative pl-6 pb-8 last:pb-0 border-l border-zinc-200 dark:border-zinc-800">
    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-ag-green" />
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
      <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
      <span className="text-sm text-zinc-500 dark:text-zinc-400 shrink-0 tabular-nums">{period}</span>
    </div>
    {org && <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">{org}</p>}
    {children}
  </div>
);

const CV = () => {
  useTitle('CV');
  const published = publications.filter((p) => p.status === 'Published').sort((a, b) => b.year - a.year);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 pt-10 md:pt-14">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="eyebrow mb-3">Curriculum vitae</p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-4">{profile.name}</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{profile.role}, {profile.affiliation}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <CopyEmail email={profile.email} />
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-ghost btn-icon">
            <LinkedInIcon size={18} />
          </a>
          <a href={profile.links.scholar} target="_blank" rel="noreferrer" aria-label="Google Scholar" className="btn btn-ghost btn-icon">
            <GraduationCap size={18} />
          </a>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-14">
          <section>
            <Heading icon={Briefcase}>Experience</Heading>
            {experience.map((e) => (
              <Entry key={e.title + e.org} title={e.title} org={e.org} period={e.period}>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{e.desc}</p>
              </Entry>
            ))}
          </section>

          <section>
            <Heading icon={GraduationCap}>Education</Heading>
            {education.map((e) => (
              <Entry key={e.school} title={e.degree} org={e.school} period={e.period}>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc pl-4">
                  {e.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </Entry>
            ))}
          </section>

          <section>
            <Heading icon={FileText}>Publications</Heading>
            <ol className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 list-decimal pl-5">
              {published.map((p) => (
                <li key={p.id} className="leading-relaxed pl-1">
                  <Link to={`/publications/${p.slug}`} className="text-zinc-900 dark:text-white font-medium hover:text-ag-deep dark:hover:text-ag-green">
                    {p.title.replace(/\.$/, '')}
                  </Link>
                  . <em>{p.journal}</em>, {p.year}.
                </li>
              ))}
            </ol>
          </section>

          <section>
            <Heading icon={BookOpen}>Training</Heading>
            {trainings.map((t) => (
              <Entry key={t.title} title={t.title} org={t.org} period={t.period}>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t.desc}</p>
              </Entry>
            ))}
          </section>

          <section>
            <Heading icon={Users}>Leadership & activities</Heading>
            {activities.map((a) => (
              <Entry key={a.title} title={a.title} org={a.org} period={a.period}>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{a.desc}</p>
              </Entry>
            ))}
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <section className="card p-6">
            <Heading icon={Wrench}>Skills</Heading>
            <div className="space-y-5">
              {skills.map((s) => (
                <div key={s.group}>
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">{s.group}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <li key={i} className="text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6">
            <Heading icon={Languages}>Test scores</Heading>
            <div className="space-y-6">
              {testScores.map((t) => (
                <div key={t.name}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-semibold text-zinc-900 dark:text-white">{t.name}</span>
                    <span className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">{t.total}</span>
                  </div>
                  <dl className={`grid gap-2 ${t.parts.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
                    {t.parts.map(([label, v]) => (
                      <div key={label} className="rounded-lg bg-zinc-50 dark:bg-zinc-800/60 p-2 text-center">
                        <dt className="text-[11px] text-zinc-500 dark:text-zinc-400">{label}</dt>
                        <dd className="text-sm font-semibold text-zinc-900 dark:text-white tabular-nums">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6">
            <Heading icon={UserCheck}>References</Heading>
            <ul className="space-y-4">
              {references.map((r) => (
                <li key={r.email}>
                  <p className="font-semibold text-zinc-900 dark:text-white">{r.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{r.title}</p>
                  <a href={`mailto:${r.email}`} className="text-sm text-ag-deep dark:text-ag-green hover:underline">{r.email}</a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CV;
