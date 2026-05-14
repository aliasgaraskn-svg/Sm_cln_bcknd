import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HrModule } from './hr/hr.module';
import { ItsmModule } from './itsm/itsm.module';
import { ExpenseModule } from './expense/expense.module';
import { LearningModule } from './learning/learning.module';
import { PiAssistModule } from './piAssist/piAssist.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    HrModule,
    ItsmModule,
    ExpenseModule,
    LearningModule,
    PiAssistModule,
    NotificationModule,
    ProfileModule,
    ApprovalsModule,
    SurveysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
