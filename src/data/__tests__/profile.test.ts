import { describe, expect, it } from 'vitest';
import { profile } from '../profile';

describe('profile projects', () => {
  it('keeps the ranked projects in the intended order', () => {
    expect(profile.projects.map(project => project.name)).toEqual([
      'AI-Powered Hackathon Solution',
      'Wordle Multiverse',
      'Neural Portfolio',
      'Exam Analyzer Pro',
      'AI Summarizer Anywhere',
      'Hybrid Mobile Platform',
      'Serverless API Platform',
      'Secret Rooms',
      'AtYourDoor',
    ]);
  });

  it('does not include the removed Enterprise SPA Suite entry', () => {
    expect(profile.projects.some(project => project.name === 'Enterprise SPA Suite')).toBe(false);
  });
});
