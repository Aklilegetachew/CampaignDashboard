import Link from "next/link";

export default function Component() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover "
        >
          <source src="/Tomocafarmhero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="h-[1px] w-8 bg-white" />
              <p className="text-lg text-white">
                Welcome to Tomoca Coffee farm
              </p>
            </div>

            <h1 className="text-3xl font-bold text-white sm:text-6xl lg:text-7xl">
              Our Farming Legacy!
            </h1>

            <div className="flex flex-wrap gap-4">
              <Link href="/Registration" className="hover:text-gray-300">
                <button className="bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100">
                  Register Here
                </button>
              </Link>
              <Link
                href="https://tomocacoffeeethiopia.com/contacts/"
                className="hover:text-gray-300"
              >
                <button className="border border-white bg-transparent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
