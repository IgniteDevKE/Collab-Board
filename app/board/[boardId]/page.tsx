import { Canvas } from "@/components/board/canvas"
import { CanvasLoading } from "@/components/board/canvas-loading"
import { Room } from "@/components/room"

interface IBoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = ({ params }: IBoardIdPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  )
}

export default BoardIdPage
