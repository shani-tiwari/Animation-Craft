

export default function AppleImgTextParallax(){

    return(
        <div className="relative h-[130vh]">
            {/* Image */}
            <div className="sticky top-0 h-screen">
                <img
                    className="w-full h-full object-cover opacity-80"
                    src="/images/unsplash.jpg"
                />
            </div>
 
            {/* Text */}
            <div className="absolute top-[40vh] left-0 w-full text-center">
                <h1 className="text-8xl font-bold text-black">
                    Blossom Flowers
                </h1>
            </div>
        </div> 
    );
};