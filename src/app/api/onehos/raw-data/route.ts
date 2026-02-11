import { NextResponse } from "next/server";
import { onehosClient } from "@/lib/onehos-prisma";

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export async function POST(request: Request) {
  try {
    const payload = await request
      .json()
      .catch(() => null);

    if (!isPlainObject(payload)) {
      return NextResponse.json(
        { error: "Payload must be a JSON object" },
        { status: 400 }
      );
    }

    const record = await onehosClient.rawData.create({
      data: {
        payload,
      },
    });

    return NextResponse.json(
      {
        id: record.id,
        payload: record.payload,
        updatedAt: record.updatedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to insert raw_data", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
