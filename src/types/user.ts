import { useQuery } from "@tanstack/react-query";

export type User = {
    id: string;
    username: string;
    email: string;
    roles: string[];
};

// eslint-disable-next-line react-hooks/rules-of-hooks
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
        const res = await fetch('/api/user');
        return res.json();
    }
})