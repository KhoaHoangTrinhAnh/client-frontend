// D:\client-frontend\src\components\ContentViewer.tsx
type Block = { type: 'text' | 'image' | 'video'; value: string };
type Content = { title: string; blocks: Block[] };

export default function ContentViewer({ content }: { content: Content }) {
  return (
    <div className="w-screen flex flex-col items-center p-4 max-w-2xl mx-auto space-y-4">
      <h2 className=" text-2xl font-bold">Tiêu đề: {content.title}</h2>
      {content.blocks.map((block, idx) => {
        const key = `${block.type}-${idx}`;
        if (block.type === "text") return <p key={key}>{block.value}</p>;
        if (block.type === "image") {
            return (
                <img
                key={key}
                src={block.value}
                alt=""
                className="w-full max-h-[400px] object-contain border rounded"
                />
            );
        }
        if (block.type === "video") {
            return (
                <video key={key} controls className="w-full max-h-[400px]">
                <source src={block.value} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
                </video>
            );
        }
      })}
    </div>
  );
}
