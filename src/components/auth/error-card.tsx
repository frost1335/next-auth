import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "./card-wrapper";

export default function ErrorCard() {
    return (
        <CardWrapper headerLabel="Opps! Something went wrong" backButtonHref="/auth/login" backButtonLabel="Back to login" >
            <div className="w-full text-3xl flex justify-center items-center">
                <ExclamationTriangleIcon className="w-7 h-7 text-destructive" />
            </div>
        </CardWrapper>
    )
}