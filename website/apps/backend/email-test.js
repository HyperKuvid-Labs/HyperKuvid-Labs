const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env' }); // Use your .env file

// Same transporter configuration as your index.ts - FIXED METHOD NAME
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.HKL_GMAIL,
        pass: 'zpmq rbgs rbls gpwk' // Your hardcoded password
    }
});

async function testEmailConfiguration() {
    console.log('🧪 Testing Email Configuration...\n');

    // Test 1: Verify transporter configuration
    console.log('📧 Environment Variables:');
    console.log(`   HKL_GMAIL: ${process.env.HKL_GMAIL}`);
    console.log(`   ADMIN1_GMAIL: ${process.env.ADMIN1_GMAIL}`);
    console.log(`   ADMIN2_GMAIL: ${process.env.ADMIN2_GMAIL}`);
    console.log(`   ADMIN3_GMAIL: ${process.env.ADMIN3_GMAIL}\n`);

    // Test 2: Verify SMTP connection
    console.log('🔗 Testing SMTP Connection...');
    try {
        await transporter.verify();
        console.log('✅ SMTP Connection: SUCCESS\n');
    } catch (error) {
        console.error('❌ SMTP Connection: FAILED');
        console.error(`   Error: ${error.message}\n`);
        return; // Stop here if connection fails
    }

    // Test 3: Send a test email (same structure as your project submission)
    console.log('📮 Sending Test Email...');
    
    const testMailData = {
        from: process.env.HKL_GMAIL,
        to: process.env.HKL_GMAIL,
        cc: [
            process.env.ADMIN1_GMAIL,
            process.env.ADMIN2_GMAIL,
            process.env.ADMIN3_GMAIL,
        ].filter(Boolean), // Remove undefined values
        subject: "🧪 Email Test - HyperKuvid Labs",
        html: `
            <h2>Email Configuration Test</h2>
            <p><strong>Test Status:</strong> Email sending is working correctly!</p>
            <p><strong>From:</strong> ${process.env.HKL_GMAIL}</p>
            <p><strong>To:</strong> ${process.env.HKL_GMAIL}</p>
            <p><strong>CC Recipients:</strong></p>
            <ul>
                <li>${process.env.ADMIN1_GMAIL}</li>
                <li>${process.env.ADMIN2_GMAIL}</li>
                <li>${process.env.ADMIN3_GMAIL}</li>
            </ul>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            <hr>
            <p><em>This is a test email from the HyperKuvid Labs email configuration test script.</em></p>
        `
    };

    try {
        const info = await transporter.sendMail(testMailData);
        console.log('✅ Email Sent Successfully!');
        console.log(`   Message ID: ${info.messageId}`);
        console.log(`   Response: ${info.response}\n`);
        
        console.log('🎯 Email Test Results:');
        console.log('   ✅ Configuration: Valid');
        console.log('   ✅ Connection: Successful');
        console.log('   ✅ Email Sending: Working');
        console.log('\n✨ Your email setup is working correctly!');
        console.log('   The 500 errors are likely caused by something else.');
        
    } catch (emailError) {
        console.error('❌ Email Sending: FAILED');
        console.error(`   Error Type: ${emailError.name}`);
        console.error(`   Error Message: ${emailError.message}`);
        console.error(`   Error Code: ${emailError.code || 'N/A'}\n`);
        
        console.log('🎯 Email Test Results:');
        console.log('   ✅ Configuration: Valid');
        console.log('   ✅ Connection: Successful');
        console.log('   ❌ Email Sending: Failed');
        console.log('\n🚨 This is likely the cause of your 500 errors!');
        
        // Common Gmail error solutions
        console.log('\n💡 Common Solutions:');
        console.log('   1. Enable "Less secure app access" in Gmail');
        console.log('   2. Use Gmail App Password instead of regular password');
        console.log('   3. Enable 2-Factor Authentication and generate app password');
        console.log('   4. Check if Gmail account is locked or requires verification');
    }
}

// Test 4: Test with different email configurations
async function testAlternativeConfig() {
    console.log('\n🔄 Testing Alternative Configuration...');
    
    const altTransporter = nodemailer.createTransport({
        service: 'gmail', // Use service instead of manual config
        auth: {
            user: process.env.HKL_GMAIL,
            pass: 'zpmq rbgs rbls gpwk'
        }
    });

    try {
        await altTransporter.verify();
        console.log('✅ Alternative Config: WORKING');
    } catch (error) {
        console.log('❌ Alternative Config: FAILED');
        console.log(`   Error: ${error.message}`);
    }
}

// Run the tests
async function runEmailTests() {
    try {
        await testEmailConfiguration();
        await testAlternativeConfig();
    } catch (error) {
        console.error('\n💥 Unexpected Error:');
        console.error(error);
    }
}

// Execute the test
runEmailTests();
