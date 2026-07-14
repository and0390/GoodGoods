export type UserSeed = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
};

export const mockUsers: UserSeed[] = [
  {
    id: "usr-cln001",
    name: "Alex Harrison",
    email: "alex.harrison@example.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "usr-cln002",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "usr-cln003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "usr-cln004",
    name: "Emma Watson",
    email: "emma.w@example.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "usr-cln005",
    name: "David Miller",
    email: "d.miller@example.com",
    emailVerified: false,
    image: null, // Test fallback avatar support
  },
  {
    id: "usr-cln006",
    name: "Clara Oswald",
    email: "clara.o@example.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
  },
];
