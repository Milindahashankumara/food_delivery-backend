import { Injectable } from '@nestjs/common';
import { db } from './db/db';
import { dispatches } from './db/schema';

const RIDERS = ['Mike', 'Alex', 'Joe', 'Bright', 'Alice'];

@Injectable()
export class AppService {
  async dispatchRider(data: {
    orderId: string;
    customerName: string;
    item: string;
  }) {
    // Pick a rider from a list;
    const rider = RIDERS[Math.floor(Math.random() * RIDERS.length)];

    const [dispatch] = await db
      .insert(dispatches)
      .values({
        orderId: data.orderId,
        customerName: data.customerName,
        item: data.item,
        riderStatus: 'dispatched',
      })
      .returning();

    console.log('Dispatch saved with ID: ' + dispatch.id);
    console.log(
      rider +
        ' is on the way with your item ' +
        data.item +
        ' for customer ' +
        data.customerName,
    );
  }
}
