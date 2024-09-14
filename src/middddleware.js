import { NextResponse } from "next/server";
import {authConfig} from './auth.config';
import NextAuth from "next-auth";

const {auth} = NextAuth(authConfig);
export async function middleware(request){
    const session = await auth();
    console.log('this is session',session);
    return NextResponse.redirect(new URL("/home/newHome",request.url));
}

export const config = {
    matcher: "/"
}