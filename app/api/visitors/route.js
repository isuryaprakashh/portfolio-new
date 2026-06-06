import connectToDatabase from '@/lib/mongodb';
import Visitor from '@/models/Visitor';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'get';

    let visitor;

    if (mode === 'hit') {
      // Atomically increment the count
      // If it doesn't exist, it will upsert and set default (98) + inc 1 = 99
      visitor = await Visitor.findOneAndUpdate(
        { key: 'isuryaprakashh_portfolio_visitors' },
        { $inc: { value: 1 } },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      );

      // Reset if it's still using the old high baseline (e.g. 18762)
      if (visitor.value > 1000) {
        visitor.value = 99;
        await visitor.save();
      } else if (visitor.value < 99) {
        // Auto-heal if the count was initialized to a lower value in a previous test
        visitor.value = 99;
        await visitor.save();
      }
    } else {
      // Just fetch the current count
      visitor = await Visitor.findOne({ key: 'isuryaprakashh_portfolio_visitors' });

      // If no document exists yet, create one with the initial value 98
      if (!visitor) {
        visitor = await Visitor.create({
          key: 'isuryaprakashh_portfolio_visitors',
          value: 98
        });
      } else {
        // Reset if it's still using the old high baseline (e.g. 99)
        if (visitor.value > 1000) {
          visitor.value = 98;
          await visitor.save();
        } else if (visitor.value < 98) {
          // Auto-heal if the count was initialized to a lower value in a previous test
          visitor.value = 98;
          await visitor.save();
        }
      }
    }

    return NextResponse.json(
      { key: visitor.key, value: visitor.value },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
