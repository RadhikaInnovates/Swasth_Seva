import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const USERS_FILE = path.resolve(DATA_DIR, 'users.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]), 'utf8');
}

export interface StoredUser {
  id: string;
  emailOrPhone: string;
  fullName: string;
  passwordHash: string;
  salt: string;
  tokens: string[];
  createdAt: string;
  profile: {
    fullName: string;
    emailOrPhone: string;
    age?: number;
    dateOfBirth?: string;
    gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
    heightCm?: number;
    heightFeet?: number;
    heightInches?: number;
    heightUnit: 'cm' | 'ft';
    weight?: number;
    weightUnit: 'kg' | 'lb';
    allergies: string[];
    medicalConditions: string[];
    currentMedications: string[];
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactRelation?: string;
    consentGiven: boolean;
    consentTimestamp?: string;
  };
}

function readUsers(): StoredUser[] {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw) || [];
  } catch (err) {
    return [];
  }
}

function writeUsers(users: StoredUser[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

export function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  try {
    const key = crypto.scryptSync(password, salt, 64);
    const hashBuffer = Buffer.from(hash, 'hex');
    return crypto.timingSafeEqual(key, hashBuffer);
  } catch (err) {
    return false;
  }
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function registerUser(userData: {
  fullName: string;
  emailOrPhone: string;
  password: string;
  age?: number;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  heightCm?: number;
  heightFeet?: number;
  heightInches?: number;
  heightUnit: 'cm' | 'ft';
  weight?: number;
  weightUnit: 'kg' | 'lb';
  allergies: string[];
  medicalConditions: string[];
  currentMedications: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  consentGiven: boolean;
}): { user: Omit<StoredUser, 'passwordHash' | 'salt'>; token: string } {
  const users = readUsers();
  const normalizedIdentifier = userData.emailOrPhone.trim().toLowerCase();

  const existing = users.find(
    (u) => u.emailOrPhone.trim().toLowerCase() === normalizedIdentifier
  );
  if (existing) {
    throw new Error('An account with this email or phone number already exists.');
  }

  const { salt, hash } = hashPassword(userData.password);
  const token = generateToken();
  const userId = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

  const newUser: StoredUser = {
    id: userId,
    emailOrPhone: userData.emailOrPhone.trim(),
    fullName: userData.fullName.trim(),
    passwordHash: hash,
    salt,
    tokens: [token],
    createdAt: new Date().toISOString(),
    profile: {
      fullName: userData.fullName.trim(),
      emailOrPhone: userData.emailOrPhone.trim(),
      age: userData.age,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender || 'Prefer not to say',
      heightCm: userData.heightCm,
      heightFeet: userData.heightFeet,
      heightInches: userData.heightInches,
      heightUnit: userData.heightUnit || 'cm',
      weight: userData.weight,
      weightUnit: userData.weightUnit || 'kg',
      allergies: userData.allergies || [],
      medicalConditions: userData.medicalConditions || [],
      currentMedications: userData.currentMedications || [],
      emergencyContactName: userData.emergencyContactName,
      emergencyContactPhone: userData.emergencyContactPhone,
      emergencyContactRelation: userData.emergencyContactRelation,
      consentGiven: Boolean(userData.consentGiven),
      consentTimestamp: new Date().toISOString(),
    },
  };

  users.push(newUser);
  writeUsers(users);

  const { passwordHash: _, salt: __, ...safeUser } = newUser;
  return { user: safeUser, token };
}

export function authenticateUser(emailOrPhone: string, password: string): {
  user: Omit<StoredUser, 'passwordHash' | 'salt'>;
  token: string;
} {
  const users = readUsers();
  const normalizedIdentifier = emailOrPhone.trim().toLowerCase();

  const user = users.find(
    (u) => u.emailOrPhone.trim().toLowerCase() === normalizedIdentifier
  );

  if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
    throw new Error('Invalid email/phone or password. Please check your credentials.');
  }

  const token = generateToken();
  user.tokens.push(token);
  writeUsers(users);

  const { passwordHash: _, salt: __, ...safeUser } = user;
  return { user: safeUser, token };
}

export function getUserByToken(token: string): Omit<StoredUser, 'passwordHash' | 'salt'> | null {
  if (!token) return null;
  const users = readUsers();
  const user = users.find((u) => u.tokens.includes(token));
  if (!user) return null;

  const { passwordHash: _, salt: __, ...safeUser } = user;
  return safeUser;
}

export function updateUserProfile(
  userId: string,
  updatedProfile: Partial<StoredUser['profile']>
): Omit<StoredUser, 'passwordHash' | 'salt'> {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found.');
  }

  users[userIndex].profile = {
    ...users[userIndex].profile,
    ...updatedProfile,
    fullName: updatedProfile.fullName || users[userIndex].profile.fullName,
    emailOrPhone: users[userIndex].profile.emailOrPhone, // preserve identifier
  };

  if (updatedProfile.fullName) {
    users[userIndex].fullName = updatedProfile.fullName;
  }

  writeUsers(users);
  const { passwordHash: _, salt: __, ...safeUser } = users[userIndex];
  return safeUser;
}

export function resetUserPassword(emailOrPhone: string, newPassword: string): void {
  const users = readUsers();
  const normalizedIdentifier = emailOrPhone.trim().toLowerCase();

  const userIndex = users.findIndex(
    (u) => u.emailOrPhone.trim().toLowerCase() === normalizedIdentifier
  );
  if (userIndex === -1) {
    throw new Error('No account found with this email or phone number.');
  }

  const { salt, hash } = hashPassword(newPassword);
  users[userIndex].passwordHash = hash;
  users[userIndex].salt = salt;
  users[userIndex].tokens = []; // invalidate old sessions
  writeUsers(users);
}

export function deleteUserAccount(userId: string): void {
  let users = readUsers();
  users = users.filter((u) => u.id !== userId);
  writeUsers(users);
}

export function revokeToken(token: string): void {
  const users = readUsers();
  for (const u of users) {
    u.tokens = u.tokens.filter((t) => t !== token);
  }
  writeUsers(users);
}
