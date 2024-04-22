import { Canvas } from "@/components/board/canvas"
import { CanvasLoading } from "@/components/board/canvas-loading"
import { Room } from "@/components/room"

interface IWorkspaceIdPageProps {
  params: {
    workspaceId: string
  }
}

const BoardIdPage = ({ params }: IWorkspaceIdPageProps) => {
  return (
    <Room roomId={params.workspaceId} fallback={<CanvasLoading />}>
      <Canvas workspaceId={params.workspaceId} />
    </Room>
  )
}

export default BoardIdPage
