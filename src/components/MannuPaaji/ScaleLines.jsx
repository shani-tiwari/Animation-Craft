import {cn} from '../../lib/utils';

// by bg-size we are making the pattern size
// by bg-[repeating-linear-gradient(315deg,var(--pattern),var(--pattern)_0.1px,transparent_1px,transparent_50%)] we are making the pattern

// by bg-fixed --- we are matching intersection points of horizontal and vertical scale lines


export default function ScaleLines() {
  return (
    <>
        <section className='relative h-screen w-full overflow-hidden flex items-center justify-center [--pattern:var(--color-neutral-300)]'>
            <HorizontalScale className="absolute inset-x-0 top-0 z-99"/>
            <HorizontalScale className="absolute inset-x-0 bottom-0 z-99"/>

            <div className="relative w-full max-w-7xl mx-auto h-full flex flex-col items-center justify-center">
                <VerticalScale className="absolute inset-y-0 left-0"/>
                <VerticalScale className="absolute inset-y-0 right-0"/>

                {/* hero section */}
                <div className='relative flex flex-col items-center justify-center h-[92%] w-full max-w-[96%] px-8 py-20 text-center'>
                    <Line className={cn("mask-b-from-10% absolute inset-x-0 top-0")} />
                    <Line className={cn("mask-t-from-10% absolute inset-x-0 bottom-0")} />
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6">
                        Shani Tiwari
                    </h1>
                    <a href="https://x.com/mannupaaji" className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
                        @MannuPaaji
                    </a>
                    <p className="text-lg md:text-xl text-neutral-700 mb-10">
                        Build your next great idea with a foundation designed to support fast iteration, seamless integration, and infinite scaling.
                    </p>
                    <div className='flex gap-4'>
                        {[{name: "Github", url: "https://github.com/shani-tiwari"}, 
                         {name: "instagram", url: "https://instagram.com/shani.develops"}, 
                         {name: "Linkedin", url: "https://linkedin.com/in/theshanitiwari"}].map((item) => (
                            <a key={item.name} href={item.url} 
                               className="px-8 py-4 bg-neutral-900 text-white rounded-md font-medium hover:bg-neutral-800 transition-colors shadow-lg active:scale-95 duration-200"
                            >
                                {item.name}
                            </a>
                        ))} 
                    </div>
                </div>
            </div>

        </section>
    </>
  )
};

// if you want to use as a function name as you want and call it like this horizontalScale() 
// const horizontalScale = (className) => {

// first letter should be uppercase to use it like an component 


const Line = ({ className }) => {
    return (
        <div className={cn("h-16 w-full",
            "bg-[repeating-linear-gradient(to_bottom,var(--pattern),var(--pattern)_2px,transparent_1px,transparent_0.5rem)]",
            className)}>
        </div>
    )
}
const HorizontalScale = ({ className }) => {
    return (
        <div 
            className={cn("h-6 w-full border-y border-(--pattern) bg-size-[10px_10px] bg-fixed",
            "bg-[repeating-linear-gradient(315deg,var(--pattern),var(--pattern)_0.1px,transparent_1px,transparent_50%)]",
            className)}
        >          
        </div>
    )
};

const VerticalScale = ({ className }) => {
    return (
        <div 
            className={cn("w-6 h-full border-x border-(--pattern) bg-size-[10px_10px] bg-fixed",
            "bg-[repeating-linear-gradient(315deg,var(--pattern),var(--pattern)_0.1px,transparent_1px,transparent_50%)]",
            className)}
        >          
        </div>
    )
};
