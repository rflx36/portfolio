

interface ProgressiveBlurProps {
    direction?: 'top' | 'bottom' | 'left' | 'right';
    intensity?: 8 | 16 | 32 | 64;
    offset?: number;
    className?: string;
}


export default function ProgressiveBlur(props: ProgressiveBlurProps) {
    const directionGradientMask = {
        bottom: 'to bottom',
        top: 'to top',
        left: 'to left',
        right: 'to right'
    }
    const generateGradientMask = () => {
        return `linear-gradient(${directionGradientMask[props.direction || 'bottom']},transparent 0%, black ${props.offset || 100}%)`;
    }

    const elementCount = props.intensity && Math.log2(props.intensity) - 2 || 1;

    return (
        // <div className={`flex ${directionFlexAlignment[props.direction || 'bottom']} w-full h-full absolute top-0 left-0 ${props?.className}`}>
        // <div className={` w-full h-full absolute top-0 left-0 ${props?.className}`}>
        //     {
        //         Array.from({ length: elementCount }, (_, i) => {
        //             console.log(props.intensity);
        //             console.log(i)
        //             console.log(Math.log2(props.intensity || 8));
        //             const dat = Math.log2(props.intensity || 8) - 2 + i;
        //             // console.log("dat:"+(Math.log2(props.intensity || 8) - 2 + i));
        //             console.log("dat:"+dat);
        //             console.log("pow:"+Math.pow(dat,2));

        //             const blurValue = Math.pow(dat, 2);

        //             return (
        //                 <div
        //                     key={i}
        //                     className="absolute w-full h-full bg-red-500 top-0"
        //                     style={{
        //                         backdropFilter: `blur(${blurValue}px)`,
        //                         WebkitBackdropFilter: `blur(${blurValue}px)`,
        //                         maskImage: generateGradientMask( i),
        //                         WebkitMaskImage: generateGradientMask( i)
        //                     }}
        //                 />
        //             )
        //         })
        //     }
        //     {/* {
        //     Array.from({ length: {props.intensity &&  }!props.intensity % 16 }, (_, i) => (
        //         <div
        //             key={i} 
        // }
        //     <div
        //         className={`w-full h-full absolute top-0 left-0 ${props?.className}`}
        //         style={{
        //             backdropFilter: `blur(${props.intensity || 10}px)`,
        //             WebkitBackdropFilter: `blur(${props.intensity || 10}px)`,
        //             maskImage: generateGradientMask(),
        //             WebkitMaskImage: generateGradientMask()
        //         }}
        //     /> */}
        // </div>

        < div
            className={`w-full h-full select-none pointer-events-none absolute bg-white/20 top-0 left-0 ${props?.className}`
            }
            style={{
                backdropFilter: `blur(${props.intensity || 10}px)`,
                WebkitBackdropFilter: `blur(${props.intensity || 10}px)`,
                maskImage: generateGradientMask(),
                WebkitMaskImage: generateGradientMask()
            }}
        />

    )
}