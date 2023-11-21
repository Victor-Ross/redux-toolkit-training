'use client';

import { useEffect } from 'react';
import { Header } from '@/components/header';
import { Module } from '@/components/module';
import { Video } from '@/components/video';
import { useAppDispatch, useAppSelector } from '@/store';
import { useCurrentLesson, loadCourse } from '@/store/slices/player';
import { MessageCircle } from 'lucide-react';

export default function PlayerComponent() {
  const dispatch = useAppDispatch();
  const modules = useAppSelector((state) => state.player.course?.modules);

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo ${currentLesson.title}`;
    }
  }, [currentLesson]);

  useEffect(() => {
    dispatch(loadCourse());
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-950 text-zinc-50">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" /> Deixar feedback
          </button>
        </div>

        <main className="relative pr-80 flex overflow-hidden rouded.lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l border-zinc-800 bg-zinc-900 divide-y-2 divide-zinc-900 overflow-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-700">
            {modules &&
              modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
