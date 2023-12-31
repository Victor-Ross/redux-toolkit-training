import dynamic from 'next/dynamic';
import { next, useCurrentLesson } from '@/store/slices/player';
import { useAppDispatch, useAppSelector } from '@/store';
import { Loader } from 'lucide-react';

export function Video() {
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

  const dispatch = useAppDispatch();

  const { currentLesson } = useCurrentLesson();

  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  function handlePlayNext() {
    dispatch(next());
  }

  if (!currentLesson) {
    return null;
  }

  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isCourseLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handlePlayNext}
        />
      )}
    </div>
  );
}
