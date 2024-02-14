export const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col items-center shadow-md gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>Pencil</div>
        <div>Eraser</div>
        <div>Text</div>
        <div>Shapes</div>
        <div>Color</div>
        <div>Size</div>
      </div>

      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div className="bg-white p-2 rounded-md shadow-md">Undo</div>
        <div className="bg-white p-2 rounded-md shadow-md">Redo</div>
      </div>
    </div>
  )
}

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col items-center shadow-md gap-y-4 rounded-md bg-white h-[360px] w-[52px]" />
  )
}
