import Link from "next/link"
import { LinkIt, LinkItUrl } from "react-linkify-it"
import UserLinkWithTooltip from "./UserLinkWithTooltip"

interface LinkiFyProps {
    children: React.ReactNode
}

export default function LinkiFy({ children }: LinkiFyProps) {
    return (
        <LinkiFyUsername>
            <LinkiFyHasgtag>
                <LinkiFyUrl>
                    {children}
                </LinkiFyUrl>
            </LinkiFyHasgtag>
        </LinkiFyUsername>
    )
}


function LinkiFyUrl({ children }: LinkiFyProps) {
    return <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
}


function LinkiFyUsername({ children }: LinkiFyProps) {
    return (
        <LinkIt regex={/(@[a-zA-Z0-9_-]+)/} component={(match, key) => (
            <UserLinkWithTooltip key={key} username={match.slice(1)}>

                {match}
            </UserLinkWithTooltip>


        )}>
            {children}
        </LinkIt>
    )
}


function LinkiFyHasgtag({ children }: LinkiFyProps) {
    return (
        <LinkIt
            regex={/(#[a-zA-Z0-9]+)/}
            component={(match, key) => (
                <Link
                    key={key}
                    href={`/hashtag/${match.slice(1)}`}
                    className="text-primary hover:underline"
                >
                    {match}
                </Link>
            )}
        >
            {children}
        </LinkIt>
    )

}