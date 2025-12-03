// app/[username]/page.tsx
import { ethers } from "ethers";
import contractABI from "../components/abi/UserRegistry.json";
import UserClient from "../components/UserClient";

type Post = {
  text: string;
  image: string;
  timestamp: number;
  likeCount: number;
  userLiked: boolean;
  postIndex?: number;
  userAddress?: string;
};

type UserData = {
  username: string;
  bio: string;
  registeredAt: number;
  address: string;
};

function toNumberSafe(value: any): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "object" && typeof value.toNumber === "function") {
    try {
      return value.toNumber();
    } catch {
      return Number(value.toString());
    }
  }
  if (typeof value === "object" && typeof value.toString === "function") {
    const s = value.toString();
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
    try {
      return Number(s);
    } catch {
      return 0;
    }
  }
  return Number(value);
}

function toAddressSafe(address: any): string {
  if (!address && address !== "") return "";
  if (typeof address === "string") return address;
  if (typeof address?.toString === "function") return address.toString();
  return String(address);
}
function sanitizeForSerialization(obj: any): any {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "bigint") return Number(obj);
  if (typeof obj === "number" || typeof obj === "string" || typeof obj === "boolean")
    return obj;

  if (typeof obj === "object" && typeof obj.toNumber === "function") {
    try {
      return obj.toNumber();
    } catch {
      return Number(obj.toString());
    }
  }

  if (Array.isArray(obj)) return obj.map((v) => sanitizeForSerialization(v));

  if (typeof obj === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = sanitizeForSerialization(v);
    }
    return out;
  }

  return obj;
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const provider = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/38JLVpf1Pe178jskhYL6lB0_4gu51cHk"
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x40e0b31400c0c6b9099e16f052524a802af10180",
    contractABI,
    provider
  );

  let userData: UserData | null = null;
  let posts: Post[] = [];

  try {
    console.log(`🔍 Looking up username: "${username}"`);

    // Method 1: Try getUserByUsername first (most direct)
    try {
      console.log("📍 Attempting getUserByUsername...");
      const rawUser = await contract.getUserByUsername(username);
      
      if (rawUser && rawUser.length >= 3) {
        const userAddr = toAddressSafe(await contract.usernameToAddress(username));
        
        if (userAddr && userAddr !== ethers.ZeroAddress) {
          userData = {
            username: String(rawUser[0]),
            bio: String(rawUser[1]),
            registeredAt: toNumberSafe(rawUser[2]),
            address: userAddr,
          };
          console.log("✅ User data retrieved via getUserByUsername");
        }
      }
    } catch (directError) {
      console.warn("getUserByUsername failed:", directError);
    }

    // Method 2: Fallback to usernameToAddress -> getUser
    if (!userData) {
      try {
        console.log("📍 Falling back to usernameToAddress lookup...");
        const rawAddr = await contract.usernameToAddress(username);
        const userAddr = toAddressSafe(rawAddr);
        
        if (userAddr && userAddr !== ethers.ZeroAddress) {
          const isRegistered = await contract.isRegistered(userAddr);
          
          if (isRegistered) {
            const rawUser = await contract.getUser(userAddr);
            userData = {
              username: String(rawUser[0]),
              bio: String(rawUser[1]),
              registeredAt: toNumberSafe(rawUser[2]),
              address: userAddr,
            };
            console.log("✅ User data retrieved via address lookup");
          }
        }
      } catch (addrError) {
        console.warn("Address lookup failed:", addrError);
      }
    }

    // Fetch posts if userData exists
    if (userData && userData.address && userData.address !== ethers.ZeroAddress) {
      try {
        // Try getAllPosts first (more efficient)
        try {
          const rawPosts: any[] = await contract.getAllPosts(userData.address);
          posts = rawPosts.map((p: any, idx: number) => ({
            text: String(p.text ?? ""),
            image: String(p.image ?? ""),
            timestamp: toNumberSafe(p.timestamp),
            likeCount: toNumberSafe(p.likeCount),
            userLiked: Boolean(p.userLiked),
            postIndex: idx,
            userAddress: userData!.address,
          }));
          console.log("✅ Retrieved posts via getAllPosts:", posts.length);
        } catch (allPostsErr) {
          console.warn("getAllPosts failed, falling back to individual posts:", allPostsErr);
          
          // Fallback to getPostCount + getPost
          const count = toNumberSafe(await contract.getPostCount(userData.address));
          for (let i = 0; i < count; i++) {
            try {
              const raw = await contract.getPost(userData.address, i);
              posts.push({
                text: String(raw[0] ?? ""),
                image: String(raw[1] ?? ""),
                timestamp: toNumberSafe(raw[2]),
                likeCount: toNumberSafe(raw[3]),
                userLiked: Boolean(raw[4]),
                postIndex: i,
                userAddress: userData.address,
              });
            } catch (e) {
              console.warn(`Failed to fetch post ${i}:`, e);
            }
          }
          console.log("✅ Retrieved posts individually:", posts.length);
        }
      } catch (postsError) {
        console.error("❌ Error fetching posts:", postsError);
        posts = [];
      }
    }
  } catch (err) {
    console.error("💥 Critical error in UserPage:", err);
  }

  // If no user data -> show not found UI
  if (!userData || !userData.address || userData.address === ethers.ZeroAddress) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-6">The user "{username}" does not exist on SocialChain.</p>
          <div className="space-y-3">
            <a
              href="/"
              className="block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Return Home
            </a>
            <a
              href="/register"
              className="block border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Register This Username
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Sanitize everything before sending to client
  const serializableUserData = sanitizeForSerialization(userData) as UserData;
  const serializablePosts = posts.map((p) =>
    sanitizeForSerialization({
      ...p,
      timestamp: Number(toNumberSafe(p.timestamp)),
      likeCount: Number(toNumberSafe(p.likeCount)),
      postIndex: Number(p.postIndex ?? 0),
      userAddress: String(p.userAddress ?? serializableUserData.address),
    })
  ) as Post[];

  return <UserClient userData={serializableUserData} posts={serializablePosts} />;
}