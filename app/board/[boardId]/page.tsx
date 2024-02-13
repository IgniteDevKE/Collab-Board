import { Canvas } from "@/components/board/canvas"

interface IBoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = ({ params }: IBoardIdPageProps) => {
  return <Canvas boardId={params.boardId} />
}

export default BoardIdPage
