import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { sql } from 'drizzle-orm';
import type { Database } from 'src/database/database-connection';
import { DATABASE_CONNECTION } from 'src/database/database.module';

@Injectable()
export class HealthService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async checkDatabase(): Promise<HealthIndicatorResult> {
    try {
      await this.db.execute(sql`SELECT 1`);
      return { database: { status: 'up' } };
    } catch (error) {
      return {
        database: { status: 'down', message: (error as Error).message },
      };
    }
  }
}
