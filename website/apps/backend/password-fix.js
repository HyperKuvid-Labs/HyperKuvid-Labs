"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function fixExistingPasswords() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            { email: 'mantissa6789@gmail.com', password: 'HKL@test' },
            { email: 'yuvanesh.skv@gmail.com', password: 'HKL@yuvi' },
            { email: 'pradheep.raop@gmail.com', password: 'Mantis@2510' }
        ];
        for (const userData of users) {
            const hashedPassword = yield bcrypt.hash(userData.password, 10);
            yield prisma.user.update({
                where: { email: userData.email },
                data: { password: hashedPassword }
            });
            console.log(`✅ Updated password for ${userData.email}`);
        }
    });
}
fixExistingPasswords();
