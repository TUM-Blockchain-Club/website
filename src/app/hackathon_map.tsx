import { HackathonMap } from "@/components/hack_map";
import { fetchHackathons } from "@/service/hackathonStrapi";

export const TBCHackathonMap = async () => {
    const hackathons = await fetchHackathons();
    
    return (
        <HackathonMap hackathons={hackathons} />
    )
}
