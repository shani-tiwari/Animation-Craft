        {/* curv shape */}
{

      <svg
        viewBox="0 0 800 400"
        width="800"
        height="400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="
                M 80 80
                C 160 40, 220 20, 300 30
                C 380 40, 420 40, 500 30
                C 580 20, 640 40, 720 80

                L 720 320

                C 640 360, 580 380, 500 370
                C 420 360, 380 360, 300 370
                C 220 380, 160 360, 80 320
            "
          fill="#fff"
        />

        <text
          x="400"
          y="220"
          text-anchor="middle"
          font-size="48"
          font-family="Arial"
          fill="#fff000"
        >
          YOUR TEXT
        </text>
      </svg>
}

{
   glowing text
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="material">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4.5"
                result="blur"
              />

              <feComposite
                in="SourceGraphic"
                in2="blur"
                operator="arithmetic"
                k2="-1"
                k3="0.5"
                result="material"
              />

              <feBlend
                in="SourceGraphic"
                in2="material"
                mode="overlay"
              />
            </filter>
          </defs>
        </svg> 
}
