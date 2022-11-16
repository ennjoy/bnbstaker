import { Module } from '@nestjs/common'
import { DatasourceService } from '../services/datasource.service'

@Module({
  providers: [DatasourceService],
  exports: [DatasourceService]
})
export class DatasourceModule {}
