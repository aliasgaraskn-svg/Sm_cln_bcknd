const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'expense', model: 'ExpenseItem', service: 'ExpenseService', resolver: 'ExpenseResolver', className: 'ExpenseModule' },
  { name: 'learning', model: 'Course', service: 'LearningService', resolver: 'LearningResolver', className: 'LearningModule' },
  { name: 'piAssist', model: 'AiResponse', service: 'PiAssistService', resolver: 'PiAssistResolver', className: 'PiAssistModule' },
  { name: 'notification', model: 'NotificationItem', service: 'NotificationService', resolver: 'NotificationResolver', className: 'NotificationModule' },
  { name: 'profile', model: 'UserProfile', service: 'ProfileService', resolver: 'ProfileResolver', className: 'ProfileModule' },
];

modules.forEach(mod => {
  const dir = path.join(__dirname, 'src', mod.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Model
  fs.writeFileSync(path.join(dir, `${mod.name}.model.ts`), `import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ${mod.model} {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
}
`);

  // Service
  fs.writeFileSync(path.join(dir, `${mod.name}.service.ts`), `import { Injectable } from '@nestjs/common';
import { ${mod.model} } from './${mod.name}.model';

@Injectable()
export class ${mod.service} {
  private items: ${mod.model}[] = [
    { id: '${mod.name}-1', title: 'Sample ${mod.model} 1' },
    { id: '${mod.name}-2', title: 'Sample ${mod.model} 2' },
  ];

  get${mod.model}s(): ${mod.model}[] {
    return this.items;
  }
}
`);

  // Resolver
  fs.writeFileSync(path.join(dir, `${mod.name}.resolver.ts`), `import { Resolver, Query } from '@nestjs/graphql';
import { ${mod.service} } from './${mod.name}.service';
import { ${mod.model} } from './${mod.name}.model';

@Resolver(() => ${mod.model})
export class ${mod.resolver} {
  constructor(private readonly service: ${mod.service}) {}

  @Query(() => [${mod.model}], { name: '${mod.name}Items' })
  get${mod.model}s() {
    return this.service.get${mod.model}s();
  }
}
`);

  // Module
  fs.writeFileSync(path.join(dir, `${mod.name}.module.ts`), `import { Module } from '@nestjs/common';
import { ${mod.resolver} } from './${mod.name}.resolver';
import { ${mod.service} } from './${mod.name}.service';

@Module({
  providers: [${mod.resolver}, ${mod.service}],
})
export class ${mod.className} {}
`);
});

console.log('All modules generated successfully.');
