import { useEffect, useState } from "react";

export const useRenderClient = () => {
    const [isClientRender, setIsClientRender] = useState(false);

	useEffect(() => {
		!isClientRender && setIsClientRender(true);
	}, [isClientRender]);


    return {isClientRender}
}