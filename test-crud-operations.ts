#!/usr/bin/env bun
// Comprehensive test for Neon CRUD operations and Cloudinary integration
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.VITE_DATABASE_URL;
const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

console.log('\n🧪 Testing Neon CRUD Operations & Cloudinary Integration\n');
console.log('━'.repeat(60) + '\n');

if (!databaseUrl) {
  console.error('❌ VITE_DATABASE_URL not found');
  process.exit(1);
}

const sql = neon(databaseUrl);
const testId = `test-${Date.now()}`;

async function testCreate() {
  console.log('1️⃣ Testing CREATE operation...');
  try {
    const newListing = {
      id: testId,
      title: '測試物件 - 自動化測試',
      type: '出售' as const,
      location: '測試市',
      price: '測試價格',
      description: '這是一個自動化測試建立的物件',
      image_url: null,
      owner_name: '測試用戶',
      sold: false
    };

    const result = await sql`
      INSERT INTO listings (id, title, type, location, price, description, image_url, owner_name, sold)
      VALUES (${newListing.id}, ${newListing.title}, ${newListing.type}, ${newListing.location},
              ${newListing.price}, ${newListing.description}, ${newListing.image_url},
              ${newListing.owner_name}, ${newListing.sold})
      RETURNING *
    `;

    console.log(`   ✅ Created listing with ID: ${result[0].id}`);
    console.log(`   📝 Title: ${result[0].title}`);
    console.log(`   📍 Location: ${result[0].location}\n`);
    return true;
  } catch (error) {
    console.error('   ❌ CREATE failed:', error);
    return false;
  }
}

async function testRead() {
  console.log('2️⃣ Testing READ operation...');
  try {
    const result = await sql`SELECT * FROM listings WHERE id = ${testId}`;

    if (result.length > 0) {
      console.log(`   ✅ Found listing: ${result[0].title}`);
      console.log(`   📊 All fields retrieved successfully\n`);
      return true;
    } else {
      console.log('   ❌ Listing not found\n');
      return false;
    }
  } catch (error) {
    console.error('   ❌ READ failed:', error);
    return false;
  }
}

async function testUpdate() {
  console.log('3️⃣ Testing UPDATE operation...');
  try {
    const newTitle = '測試物件 - 已更新';
    const result = await sql`
      UPDATE listings
      SET title = ${newTitle}, sold = ${true}
      WHERE id = ${testId}
      RETURNING *
    `;

    if (result.length > 0 && result[0].title === newTitle && result[0].sold === true) {
      console.log(`   ✅ Updated title: ${result[0].title}`);
      console.log(`   ✅ Updated sold status: ${result[0].sold}\n`);
      return true;
    } else {
      console.log('   ❌ Update verification failed\n');
      return false;
    }
  } catch (error) {
    console.error('   ❌ UPDATE failed:', error);
    return false;
  }
}

async function testDelete() {
  console.log('4️⃣ Testing DELETE operation...');
  try {
    await sql`DELETE FROM listings WHERE id = ${testId}`;

    const check = await sql`SELECT * FROM listings WHERE id = ${testId}`;

    if (check.length === 0) {
      console.log('   ✅ Listing deleted successfully\n');
      return true;
    } else {
      console.log('   ❌ Listing still exists after delete\n');
      return false;
    }
  } catch (error) {
    console.error('   ❌ DELETE failed:', error);
    return false;
  }
}

async function testCloudinary() {
  console.log('5️⃣ Testing Cloudinary Integration...');

  if (!cloudName || !uploadPreset) {
    console.log('   ⚠️  Cloudinary not configured (optional)');
    console.log(`   Cloud Name: ${cloudName ? '✅ Set' : '❌ Missing'}`);
    console.log(`   Upload Preset: ${uploadPreset ? '✅ Set' : '❌ Missing'}\n`);
    return null;
  }

  console.log(`   ✅ Cloud Name: ${cloudName}`);
  console.log(`   ✅ Upload Preset: ${uploadPreset}`);

  try {
    // Create a simple test image (1x1 red pixel PNG)
    const testImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';

    // Convert base64 to blob
    const base64Data = testImageBase64.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', blob, 'test.png');
    formData.append('upload_preset', uploadPreset);

    console.log('   📤 Uploading test image to Cloudinary...');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ Image uploaded successfully!');
      console.log(`   🔗 URL: ${data.secure_url.substring(0, 60)}...`);
      console.log(`   📁 Public ID: ${data.public_id}\n`);

      // Clean up - delete the test image
      console.log('   🧹 Cleaning up test image...');
      console.log('   ℹ️  Note: Deletion requires API key (skipping)\n');

      return true;
    } else {
      const errorText = await response.text();
      console.log('   ❌ Upload failed:', response.status);
      console.log('   Error:', errorText, '\n');
      return false;
    }
  } catch (error) {
    console.error('   ❌ Cloudinary test failed:', error, '\n');
    return false;
  }
}

async function testListingWithImage() {
  console.log('6️⃣ Testing listing with image URL...');

  const testImageUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
  const imageTestId = `test-img-${Date.now()}`;

  try {
    const result = await sql`
      INSERT INTO listings (id, title, type, location, price, description, image_url, owner_name, sold)
      VALUES (${imageTestId}, ${'測試物件含圖片'}, ${'出售'}, ${'測試市'},
              ${'測試價格'}, ${'測試圖片URL'}, ${testImageUrl},
              ${'測試用戶'}, ${false})
      RETURNING *
    `;

    if (result[0].image_url === testImageUrl) {
      console.log('   ✅ Created listing with image URL');
      console.log(`   🖼️  Image: ${result[0].image_url}\n`);

      // Clean up
      await sql`DELETE FROM listings WHERE id = ${imageTestId}`;
      console.log('   🧹 Test listing cleaned up\n');
      return true;
    } else {
      console.log('   ❌ Image URL not saved correctly\n');
      return false;
    }
  } catch (error) {
    console.error('   ❌ Image test failed:', error, '\n');
    return false;
  }
}

// Run all tests
async function runTests() {
  const results = {
    create: false,
    read: false,
    update: false,
    delete: false,
    cloudinary: null as boolean | null,
    imageUrl: false
  };

  try {
    results.create = await testCreate();
    if (results.create) results.read = await testRead();
    if (results.read) results.update = await testUpdate();
    if (results.update) results.delete = await testDelete();
    results.cloudinary = await testCloudinary();
    results.imageUrl = await testListingWithImage();

    // Summary
    console.log('━'.repeat(60));
    console.log('\n📊 Test Summary\n');
    console.log(`   CREATE:     ${results.create ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   READ:       ${results.read ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   UPDATE:     ${results.update ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   DELETE:     ${results.delete ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Cloudinary: ${results.cloudinary === true ? '✅ PASS' : results.cloudinary === false ? '❌ FAIL' : '⚠️  SKIPPED'}`);
    console.log(`   Image URL:  ${results.imageUrl ? '✅ PASS' : '❌ FAIL'}`);

    const passed = [results.create, results.read, results.update, results.delete, results.imageUrl].filter(Boolean).length;
    const total = 5 + (results.cloudinary !== null ? 1 : 0);
    const totalTests = 5; // Not counting Cloudinary as it's optional

    console.log(`\n   Total: ${passed}/${totalTests} tests passed\n`);

    if (passed === totalTests) {
      console.log('🎉 All core tests passed! Your Neon database is working perfectly.\n');

      if (results.cloudinary === true) {
        console.log('☁️  Cloudinary integration is also working!\n');
      } else if (results.cloudinary === null) {
        console.log('ℹ️  Cloudinary is optional - images will be stored as base64\n');
      }

      console.log('✅ Ready for production deployment!\n');
      console.log('🚀 Next steps:');
      console.log('   1. Test in the admin panel UI: http://localhost:8080/admin');
      console.log('   2. Deploy to Zeabur when ready');
      console.log('   3. Monitor performance in Neon dashboard\n');
    } else {
      console.log('⚠️  Some tests failed. Please check the errors above.\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

runTests();
