import { useInView } from "react-intersection-observer"

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
    onBottomReached: () => void;
    className?: string
}

export default function InfiniteScrollContainer({
    children, onBottomReached, className
}: InfiniteScrollContainerProps) {
    const {ref} = useInView({
        onChange(inView){
            if(inView){
                onBottomReached()
            }
        }
    })
    return <div className={className}>
        {children}
        <div ref={ref} />
    </div>
}