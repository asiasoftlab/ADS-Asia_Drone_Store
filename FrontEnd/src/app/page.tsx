import HomeClient from "@/components/home/HomeClient";

export default function Home() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20 relative z-10 w-full flex flex-col justify-center items-center flex-1 min-h-[40vh]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[500px] md:h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            
            <div className="text-center space-y-4 max-w-2xl px-4">
                <p className="text-slate-500 text-lg md:text-xl font-medium">Home Sweet Home😁😁😁</p>
                <HomeClient />
            </div>
        </main>
    );
}