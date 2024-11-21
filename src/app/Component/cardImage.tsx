import Image from "next/image";

interface BlogPost {
  imageSrc: string;
  title: string;
  date: string;
  commentCount: number;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function CardImage({ posts }: BlogSectionProps) {
  return (
    <div className="bg-[#0a0a0a] px-4 py-16 text-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-[#ff5733] text-sm font-medium mb-4">Our Farms </p>
          <h2 className="text-4xl font-bold">
            From Coffee Fields to Dairy Pastures, Discover Ethiopia&apos;s Finest
            Farms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <div key={index} className="relative group">
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={post.imageSrc}
                  alt={post.title}
                  
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                  <div className="flex items-center text-sm text-gray-300 space-x-4">
                    <span>{post.date}</span>
                    <span>Comments ({post.commentCount})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-[#ff5733] hover:bg-[#ff4520] text-white px-8 py-3 rounded-md transition-colors duration-200">
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  );
}
