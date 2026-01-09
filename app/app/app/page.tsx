'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Project {
  id: number;
  name: string;
  twitter_handle: string;
  account_created: string;
  followers: number;
  description: string;
  website: string;
  reason: string;
  discovered_at: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('web3_projects')
      .select('*')
      .order('discovered_at', { ascending: false })
      .limit(50);

    if (data) setProjects(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Early Web3 Radar 🚀
          </h1>
          <p className="text-gray-300 text-lg">
            Discovering new web3 projects on Twitter • Updated daily
          </p>
        </div>

        {loading ? (
          <div className="text-white text-center py-20 text-xl">
            Loading projects...
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Project</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Twitter</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Account Age</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Followers</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Description</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-lg">
                        No projects discovered yet. The scanner runs daily - check back tomorrow!
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.id} className="border-t border-white/10 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white font-medium">{project.name}</td>
                        <td className="px-6 py-4">
                          <a
                            href={`https://twitter.com/${project.twitter_handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            @{project.twitter_handle}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(project.account_created).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-300">{project.followers.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-300 max-w-md">{project.description}</td>
                        <td className="px-6 py-4">
                          {project.website && (
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition"
                            >
                              Visit →
                            </a>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-gray-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </main>
  );
}
