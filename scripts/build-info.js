import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  // Get last git commit date
  const gitDate = execSync('git log -1 --format=%ci', { encoding: 'utf-8' }).trim();
  const commitHash = execSync('git log -1 --format=%h', { encoding: 'utf-8' }).trim();
  
  // Format tanggal saja
  const commitDate = new Date(gitDate);
  const formattedDate = commitDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Create build info
  const buildInfo = {
    lastCommitDate: formattedDate,
    commitHash: commitHash,
    buildTime: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    timestamp: Date.now()
  };

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write to public folder
  fs.writeFileSync(
    path.join(publicDir, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );

  console.log('✅ Build info generated:', buildInfo);
} catch (error) {
  console.warn('⚠️ Could not generate build info:', error.message);
  
  // Fallback build info
  const fallbackInfo = {
    lastCommitDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    commitHash: 'unknown',
    buildTime: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    timestamp: Date.now()
  };
  
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(publicDir, 'build-info.json'),
    JSON.stringify(fallbackInfo, null, 2)
  );
}