import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function POST(req: NextRequest) {
	try {
		const authHeader = req.headers.get("authorization");
		if (!authHeader?.startsWith("Bearer ")) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
		}

		const token = authHeader.split(" ")[1];
		const { data: { user }, error } = await supabase.auth.getUser(token);

		if (error || !user) {
			return NextResponse.json({ error: "Invalid Session" }, { status: 401, headers: corsHeaders() });
		}

		// Create a seperate supabase client instance with bearer token attached so RLS can be passed
		const supabaseForRls = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				global: {
					headers: { Authorization: `Bearer ${token}` }
				}
			}
		);

		const { data: userDetails } = await supabaseForRls
			.from('users')
			.select("subscription_status")
			.eq("user_id", user.id)
			.single();

		console.log(user, userDetails);

		if (userDetails?.subscription_status !== 'pro') {
			return NextResponse.json({ error: "Pro Subscription required" }, { status: 403, headers: corsHeaders() });
		}

		return NextResponse.json({ summary: "GG WELL PLAYED" }, { status: 200, headers: corsHeaders() });
	} catch (err) {
		console.error("Summarize error:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders() });
	}
}
