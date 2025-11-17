"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const PayrollSchema_schema_1 = require("./models/PayrollSchema.schema");
const payroll_schema_service_1 = require("./payroll-schema.service");
const payroll_schema_controller_1 = require("./payroll-schema.controller");
const crud_test_service_1 = require("./crud-test.service");
const Allowance_schema_1 = require("./models/Allowance.schema");
const ApprovalRequest_schema_1 = require("./models/ApprovalRequest.schema");
const AuditLog_schema_1 = require("./models/AuditLog.schema");
const Deduction_schema_1 = require("./models/Deduction.schema");
const InsuranceBracket_schema_1 = require("./models/InsuranceBracket.schema");
const PayGrade_schema_1 = require("./models/PayGrade.schema");
const PayrollArea_schema_1 = require("./models/PayrollArea.schema");
const PayrollPolicy_schema_1 = require("./models/PayrollPolicy.schema");
const PayType_schema_1 = require("./models/PayType.schema");
const ResignationBenefitRule_schema_1 = require("./models/ResignationBenefitRule.schema");
const SigningBonus_schema_1 = require("./models/SigningBonus.schema");
const SystemSetting_schema_1 = require("./models/SystemSetting.schema");
const TaxRule_schema_1 = require("./models/TaxRule.schema");
const TerminationBenefitRule_schema_1 = require("./models/TerminationBenefitRule.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI ??
                'mongodb+srv://user:mdp067QvT0Tnb5WR@hr-system-cluster.xagcoyo.mongodb.net/'),
            mongoose_1.MongooseModule.forFeature([
                { name: PayrollSchema_schema_1.PayrollSchema.name, schema: PayrollSchema_schema_1.PayrollSchemaSchema },
                { name: Allowance_schema_1.Allowance.name, schema: Allowance_schema_1.AllowanceSchema },
                { name: ApprovalRequest_schema_1.ApprovalRequest.name, schema: ApprovalRequest_schema_1.ApprovalRequestSchema },
                { name: AuditLog_schema_1.AuditLog.name, schema: AuditLog_schema_1.AuditLogSchema },
                { name: Deduction_schema_1.Deduction.name, schema: Deduction_schema_1.DeductionSchema },
                { name: InsuranceBracket_schema_1.InsuranceBracket.name, schema: InsuranceBracket_schema_1.InsuranceBracketSchema },
                { name: PayGrade_schema_1.PayGrade.name, schema: PayGrade_schema_1.PayGradeSchema },
                { name: PayrollArea_schema_1.PayrollArea.name, schema: PayrollArea_schema_1.PayrollAreaSchema },
                { name: PayrollPolicy_schema_1.PayrollPolicy.name, schema: PayrollPolicy_schema_1.PayrollPolicySchema },
                { name: PayType_schema_1.PayType.name, schema: PayType_schema_1.PayTypeSchema },
                { name: ResignationBenefitRule_schema_1.ResignationBenefitRule.name, schema: ResignationBenefitRule_schema_1.ResignationBenefitRuleSchema },
                { name: SigningBonus_schema_1.SigningBonus.name, schema: SigningBonus_schema_1.SigningBonusSchema },
                { name: SystemSetting_schema_1.SystemSetting.name, schema: SystemSetting_schema_1.SystemSettingSchema },
                { name: TaxRule_schema_1.TaxRule.name, schema: TaxRule_schema_1.TaxRuleSchema },
                { name: TerminationBenefitRule_schema_1.TerminationBenefitRule.name, schema: TerminationBenefitRule_schema_1.TerminationBenefitRuleSchema },
            ]),
        ],
        controllers: [app_controller_1.AppController, payroll_schema_controller_1.PayrollSchemaController],
        providers: [app_service_1.AppService, payroll_schema_service_1.PayrollSchemaService, crud_test_service_1.CrudTestService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map