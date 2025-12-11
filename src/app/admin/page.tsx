'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 引入 router
import { Save, FilePlus, RefreshCw, Terminal, ArrowLeft, Trash2, Calendar, Tag, Star, X, LayoutTemplate, Columns, User, Monitor, Plus, Link as LinkIcon, LogOut } from 'lucide-react'; // 引入 LogOut 图标
import { parseFile, stringifyFile } from '@/lib/admin-utils';
import LivePreview from '@/components/admin/LivePreview';

const PRESET_TAGS = ['React', 'Next.js', 'Cyberpunk', 'Web3', 'Design', 'Hardcore', 'Tutorial'];
const PLATFORMS = ['github', 'twitter', 'mail', 'linkedin', 'instagram', 'youtube', 'website'];

export default function AdminPage() {
  const router = useRouter(); // 初始化 router
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [status, setStatus] = useState('IDLE'); 
  const [layoutMode, setLayoutMode] = useState<'SPLIT' | 'TAB'>('SPLIT'); 
  const [activeTab, setActiveTab] = useState<'EDIT' | 'PREVIEW'>('EDIT');
  
  const [pageMode, setPageMode] = useState<'CONTENT' | 'PROFILE'>('CONTENT');

  // 文章编辑器状态
  const [meta, setMeta] = useState<any>({ title: '', date: new Date().toISOString().split('T')[0], description: '', tags: [], featured: false });
  const [body, setBody] = useState('');
  const [newTag, setNewTag] = useState('');

  // 档案编辑器状态
  const [profile, setProfile] = useState<any>({
    name: '', role: '', avatar: '', bio: '', socials: []
  });
  // 临时添加社交链接的状态
  const [newSocial, setNewSocial] = useState({ platform: 'github', url: '' });

  // 初始化加载
  useEffect(() => { 
      loadFiles(); 
      loadProfile(); 
  }, []);

  // --- 新增：登出处理函数 ---
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (e) {
      console.error('Logout failed');
    }
  };

  const loadFiles = async () => {
    try {
      const res = await fetch('/api/posts', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch posts'); 
      const data = await res.json();
      setFiles(data.files || []);
    } catch (e) { setStatus('NET_ERR'); }
  };

  const loadProfile = async () => {
      try {
          const res = await fetch('/api/profile', { cache: 'no-store' });
          if (!res.ok) throw new Error('Failed to fetch profile'); 
          const data = await res.json();
          if (!data.socials) data.socials = [];
          setProfile(data);
      } catch(e) { 
          console.error(e); 
          setStatus('NET_ERR'); 
      }
  };

  const handleSaveProfile = async () => {
      setStatus('SAVING...');
      try {
          await fetch('/api/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(profile)
          });
          setStatus('SAVED');
          setTimeout(() => setStatus('IDLE'), 2000);
      } catch(e) { setStatus('ERR'); }
  }

  // 社交链接管理
  const addSocial = () => {
      if (!newSocial.url) return;
      setProfile({ ...profile, socials: [...profile.socials, newSocial] });
      setNewSocial({ platform: 'github', url: '' });
  };
  
  const removeSocial = (idx: number) => {
      const next = [...profile.socials];
      next.splice(idx, 1);
      setProfile({ ...profile, socials: next });
  };

  const handleSelectFile = async (filename: string) => {
      setStatus('LOADING...');
      const slug = filename.replace('.mdx', '');
      setSelectedFile(slug);
      try {
          const res = await fetch(`/api/posts?file=${filename}`, { cache: 'no-store' });
          if (res.ok) {
              const data = await res.json();
              const parsed = parseFile(data.content);
              setMeta(parsed.meta);
              setBody(parsed.body);
              setStatus('READY');
          } else { setBody('// Error loading file.'); setStatus('READ_ERR'); }
      } catch (e) { setStatus('NET_ERR'); }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    setStatus('SAVING...');
    const fullContent = stringifyFile(meta, body);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: selectedFile, content: fullContent }),
      });
      if (res.ok) {
        setStatus('SAVED');
        loadFiles();
        setTimeout(() => setStatus('IDLE'), 2000);
      } else { setStatus('SAVE_ERR'); }
    } catch (e) { setStatus('NET_ERR'); }
  };

  const handleDelete = async () => {
      if (!selectedFile || !confirm(`DELETE [ ${selectedFile} ] PERMANENTLY?`)) return;
      setStatus('DELETING...');
      try {
          const res = await fetch(`/api/posts?file=${selectedFile}.mdx`, { method: 'DELETE' });
          if (res.ok) {
              setStatus('DELETED');
              setSelectedFile('');
              setMeta({ title: '', date: new Date().toISOString().split('T')[0], description: '', tags: [], featured: false });
              setBody('');
              loadFiles();
              setTimeout(() => setStatus('IDLE'), 2000);
          } else { setStatus('DEL_ERR'); }
      } catch (e) { setStatus('NET_ERR'); }
  };

  const addTag = (tag: string) => {
      if (!meta.tags.includes(tag)) setMeta({ ...meta, tags: [...meta.tags, tag] });
      setNewTag('');
  };
  const removeTag = (tag: string) => {
      setMeta({ ...meta, tags: meta.tags.filter((t: string) => t !== tag) });
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] p-4 font-mono text-sm">
      {/* 顶部栏 */}
      <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4 bg-white p-4 shadow-hard">
        <div className="flex items-center gap-4">
          <Link href="/" className="bg-black text-white p-2 hover:bg-hot-pink transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black uppercase flex items-center gap-2">
            <Terminal /> CYBER_CONSOLE <span className="text-xs bg-acid-green text-black px-2 py-1">V3.5</span>
          </h1>
          
          <div className="flex bg-gray-200 p-1 gap-1 border border-black ml-4">
              <button 
                onClick={() => setPageMode('CONTENT')}
                className={`flex items-center gap-2 px-3 py-1 font-bold transition-all ${pageMode === 'CONTENT' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
              >
                  <Monitor size={14}/> CONTENT
              </button>
              <button 
                onClick={() => setPageMode('PROFILE')}
                className={`flex items-center gap-2 px-3 py-1 font-bold transition-all ${pageMode === 'PROFILE' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
              >
                  <User size={14}/> PROFILE
              </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {pageMode === 'CONTENT' && (
               <div className="hidden md:flex gap-2 mr-4">
                  <button onClick={() => setLayoutMode('SPLIT')} className={`p-1 border ${layoutMode === 'SPLIT' ? 'bg-black text-white' : 'border-gray-400 text-gray-400'}`}><Columns size={16}/></button>
                  <button onClick={() => setLayoutMode('TAB')} className={`p-1 border ${layoutMode === 'TAB' ? 'bg-black text-white' : 'border-gray-400 text-gray-400'}`}><LayoutTemplate size={16}/></button>
               </div>
           )}
           <div className="text-xs font-bold mr-2">STATUS: <span className={status.includes('ERR') ? 'text-red-600' : 'text-green-600'}>{status}</span></div>
           
           {/* --- 新增：登出按钮 --- */}
           <button 
             onClick={handleLogout}
             className="bg-red-600 text-white px-3 py-1 font-bold flex items-center gap-2 hover:bg-black transition-colors border border-black"
           >
             <LogOut size={14} /> EXIT
           </button>
        </div>
      </div>

      {/* --- 模式 1: 内容管理 --- */}
      {pageMode === 'CONTENT' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
            <div className="hidden md:flex md:col-span-2 bg-white border-4 border-black p-4 flex-col shadow-hard-sm">
              <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                <h2 className="font-bold">DB</h2>
                <button onClick={loadFiles}><RefreshCw size={14} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1">
                {files.map(f => (
                  <div key={f} onClick={() => handleSelectFile(f)} className={`p-1 px-2 text-xs border-l-4 cursor-pointer truncate ${selectedFile === f.replace('.mdx', '') ? 'bg-black text-acid-green border-acid-green' : 'border-transparent hover:bg-gray-100'}`}>
                    {f.replace('.mdx', '')}
                  </div>
                ))}
              </div>
              <button onClick={() => { setSelectedFile('new-post'); setMeta({ title: '', date: new Date().toISOString().split('T')[0], description: '', tags: [], featured: false }); setBody('# New Post\n\n...'); setStatus('NEW'); }} className="mt-4 border-2 border-black bg-warning-yellow p-2 flex items-center justify-center gap-2 font-bold text-xs hover:bg-black hover:text-white transition-colors">
                <FilePlus size={14} /> NEW
              </button>
            </div>

            <div className="col-span-1 md:col-span-10 flex flex-col bg-[#1a1a1a] border-4 border-black shadow-hard relative overflow-hidden">
              <div className="bg-gray-900 border-b-4 border-black p-3 grid grid-cols-1 md:grid-cols-12 gap-4 text-gray-300 text-xs">
                 <div className="md:col-span-3 space-y-2">
                    <input type="text" value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)} className="w-full bg-black border border-gray-700 p-1 text-acid-green font-bold outline-none" placeholder="Slug"/>
                    <input type="date" value={meta.date} onChange={(e) => setMeta({...meta, date: e.target.value})} className="w-full bg-black border border-gray-700 p-1 text-white outline-none"/>
                 </div>
                 <div className="md:col-span-5 space-y-2">
                    <input type="text" value={meta.title} onChange={(e) => setMeta({...meta, title: e.target.value})} className="w-full bg-black border border-gray-700 p-1 text-white font-bold outline-none" placeholder="Title"/>
                    <input type="text" value={meta.description} onChange={(e) => setMeta({...meta, description: e.target.value})} className="w-full bg-black border border-gray-700 p-1 text-gray-400 outline-none" placeholder="Description"/>
                 </div>
                 <div className="md:col-span-4 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-1 mb-1 max-h-[40px] overflow-y-auto">
                        {meta.tags.map((tag: string) => <span key={tag} className="bg-hot-pink text-white px-1 flex items-center gap-1 cursor-pointer" onClick={() => removeTag(tag)}>{tag} <X size={10}/></span>)}
                        <input type="text" placeholder="+Tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag(newTag)} className="bg-transparent border-b border-gray-700 w-12 outline-none text-gray-400"/>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex gap-1 overflow-x-auto w-1/2 opacity-50 hover:opacity-100">{PRESET_TAGS.map(t => <button key={t} onClick={() => addTag(t)} className="border border-gray-700 px-1 hover:text-acid-green">{t}</button>)}</div>
                        <button onClick={() => setMeta({...meta, featured: !meta.featured})} className={`px-2 py-1 border border-gray-700 flex items-center gap-1 ${meta.featured ? 'bg-warning-yellow text-black' : 'bg-black text-gray-500'}`}><Star size={10} fill={meta.featured ? "black" : "none"} /> TOP</button>
                    </div>
                 </div>
              </div>

              <div className="flex-1 flex overflow-hidden relative bg-[#0d0d0d]">
                 <div className={`flex flex-col h-full border-r border-gray-800 ${layoutMode === 'SPLIT' ? 'w-1/2' : (activeTab === 'EDIT' ? 'w-full' : 'hidden')}`}>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} className="flex-1 w-full bg-transparent text-gray-300 p-4 font-mono text-sm outline-none resize-none leading-relaxed" spellCheck={false} placeholder="# Start typing..."/>
                 </div>
                 <div className={`flex flex-col h-full bg-[#151515] ${layoutMode === 'SPLIT' ? 'w-1/2' : (activeTab === 'PREVIEW' ? 'w-full' : 'hidden')}`}>
                    <div className="flex-1 w-full p-6 overflow-y-auto"><LivePreview content={body} /></div>
                 </div>
              </div>

              <div className="p-3 border-t-4 border-black flex justify-between items-center bg-white">
                 {selectedFile && selectedFile !== 'new-post' ? <button onClick={handleDelete} className="text-red-600 border border-transparent hover:border-red-600 px-3 py-1 font-bold flex items-center gap-1"><Trash2 size={14} /> DEL</button> : <div></div>}
                 <button onClick={handleSave} className="bg-black text-acid-green border-2 border-black px-6 py-2 font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all shadow-hard"><Save size={16} /> SAVE_SYSTEM</button>
              </div>
            </div>
          </div>
      )}

      {/* --- 模式 2: 个人档案管理 (新增联系方式管理) --- */}
      {pageMode === 'PROFILE' && (
          <div className="max-w-4xl mx-auto border-4 border-black bg-white p-8 shadow-hard relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl select-none pointer-events-none">ID_CARD</div>
              
              <h2 className="text-3xl font-black mb-8 border-b-4 border-black pb-4 uppercase">Identity Protocol</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 左侧：预览区域 */}
                  <div className="border-4 border-black p-6 flex flex-col items-center bg-gray-50">
                      <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden mb-6 bg-white relative">
                          {profile.avatar ? (
                              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold">NO_IMG</div>
                          )}
                      </div>
                      <h3 className="text-4xl font-black uppercase text-center mb-2">{profile.name || 'UNKNOWN'}</h3>
                      <span className="bg-black text-white px-3 py-1 font-mono text-sm">{profile.role || 'NPC'}</span>
                      
                      {/* 社交链接预览 */}
                      <div className="flex flex-wrap gap-2 mt-6 justify-center">
                          {profile.socials.map((s: any, idx: number) => (
                              <div key={idx} className="w-8 h-8 border-2 border-black flex items-center justify-center bg-white text-xs font-bold" title={s.url}>
                                  {s.platform[0].toUpperCase()}
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* 右侧：表单区域 */}
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {/* 基本信息 */}
                      <div>
                          <label className="block font-bold mb-1">CODENAME (Name)</label>
                          <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full border-2 border-black p-2 outline-none focus:bg-yellow-100 font-mono" />
                      </div>
                      <div>
                          <label className="block font-bold mb-1">FUNCTION (Role)</label>
                          <input type="text" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} className="w-full border-2 border-black p-2 outline-none focus:bg-yellow-100 font-mono" />
                      </div>
                      <div>
                          <label className="block font-bold mb-1">AVATAR URL</label>
                          <input type="text" value={profile.avatar} onChange={e => setProfile({...profile, avatar: e.target.value})} className="w-full border-2 border-black p-2 outline-none focus:bg-yellow-100 font-mono text-xs" />
                      </div>
                      
                      {/* 社交链接管理区域 */}
                      <div className="border-t-2 border-black pt-4 mt-4">
                          <label className="block font-bold mb-2">CONNECTIONS (Socials)</label>
                          
                          <div className="space-y-2 mb-4">
                              {profile.socials.map((s: any, idx: number) => (
                                  <div key={idx} className="flex items-center gap-2 bg-gray-100 p-2 border border-gray-300">
                                      <span className="font-bold w-20 uppercase text-xs">{s.platform}</span>
                                      <span className="flex-1 truncate text-xs text-gray-600">{s.url}</span>
                                      <button onClick={() => removeSocial(idx)} className="text-red-500 hover:bg-red-100 p-1 rounded"><Trash2 size={14}/></button>
                                  </div>
                              ))}
                          </div>

                          <div className="flex gap-2">
                              <select 
                                value={newSocial.platform} 
                                onChange={e => setNewSocial({...newSocial, platform: e.target.value})}
                                className="border-2 border-black p-2 bg-white outline-none font-mono text-xs w-28"
                              >
                                  {PLATFORMS.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
                              </select>
                              <input 
                                type="text" 
                                placeholder="https://..." 
                                value={newSocial.url} 
                                onChange={e => setNewSocial({...newSocial, url: e.target.value})}
                                className="flex-1 border-2 border-black p-2 outline-none font-mono text-xs"
                              />
                              <button onClick={addSocial} className="bg-acid-green border-2 border-black px-3 hover:bg-black hover:text-white transition-colors">
                                  <Plus size={16} />
                              </button>
                          </div>
                      </div>

                      <button onClick={handleSaveProfile} className="w-full bg-red-600 text-white border-4 border-black py-3 font-black text-xl hover:bg-red-500 hover:scale-[1.02] active:scale-100 transition-all shadow-hard mt-4 sticky bottom-0">
                          UPDATE IDENTITY
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}