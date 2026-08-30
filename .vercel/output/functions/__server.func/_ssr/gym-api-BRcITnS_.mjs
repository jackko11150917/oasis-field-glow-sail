import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as getSql, t as authMiddleware } from "./middleware-DMTYZixe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gym-api-BRcITnS_.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function parseJson(raw, fallback) {
	if (!raw) return fallback;
	try {
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function toProfile(row) {
	return {
		name: row.name,
		sex: row.sex === "female" ? "female" : "male",
		bodyweight: Number(row.bodyweight) || 70,
		onboarded: Boolean(row.onboarded)
	};
}
function toWorkout(row) {
	return {
		id: row.id,
		name: row.name,
		startedAt: row.started_at,
		finishedAt: row.finished_at,
		exercises: parseJson(row.exercises_json, []),
		xpEarned: Number(row.xp_earned) || 0,
		breakdown: parseJson(row.breakdown_json, []),
		prs: parseJson(row.prs_json, [])
	};
}
var loadGymState_createServerFn_handler = createServerRpc({
	id: "7f412f288bf0a2e0417681ebaaafe6beebb1340c3e88aec635b5b27fa02824ef",
	name: "loadGymState",
	filename: "src/lib/gym-api.ts"
}, (opts) => loadGymState.__executeServer(opts));
var loadGymState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadGymState_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const profiles = await sql`
      select name, sex, bodyweight, onboarded, xp, session_json
      from gym_profiles
      where user_id = ${context.userId}
    `;
	const workouts = await sql`
      select id, name, started_at, finished_at, exercises_json, xp_earned, breakdown_json, prs_json
      from gym_workouts
      where user_id = ${context.userId}
      order by finished_at asc
    `;
	const row = profiles[0];
	return {
		profile: row ? toProfile(row) : null,
		xp: row ? Number(row.xp) || 0 : 0,
		workouts: workouts.map(toWorkout),
		session: row ? parseJson(row.session_json, null) : null
	};
});
var saveGymSnapshot_createServerFn_handler = createServerRpc({
	id: "b469b218e3c353098fe0dae6f0a73591b14831637c6dc6cf3d5240e6f74e5fa1",
	name: "saveGymSnapshot",
	filename: "src/lib/gym-api.ts"
}, (opts) => saveGymSnapshot.__executeServer(opts));
var saveGymSnapshot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveGymSnapshot_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const sessionJson = data.session ? JSON.stringify(data.session) : null;
	await sql`
      insert into gym_profiles (user_id, name, sex, bodyweight, onboarded, xp, session_json, updated_at)
      values (
        ${context.userId},
        ${data.profile.name},
        ${data.profile.sex},
        ${data.profile.bodyweight},
        ${data.profile.onboarded},
        ${data.xp},
        ${sessionJson},
        now()
      )
      on conflict (user_id) do update set
        name = excluded.name,
        sex = excluded.sex,
        bodyweight = excluded.bodyweight,
        onboarded = excluded.onboarded,
        xp = excluded.xp,
        session_json = excluded.session_json,
        updated_at = now()
    `;
});
var saveGymWorkout_createServerFn_handler = createServerRpc({
	id: "da984a8634cb520cd0b24217da22206d870048ac148887dd8bda51c4f10d6f94",
	name: "saveGymWorkout",
	filename: "src/lib/gym-api.ts"
}, (opts) => saveGymWorkout.__executeServer(opts));
var saveGymWorkout = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveGymWorkout_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into gym_workouts (
        id, user_id, name, started_at, finished_at, exercises_json, xp_earned, breakdown_json, prs_json
      )
      values (
        ${data.id},
        ${context.userId},
        ${data.name},
        ${data.startedAt},
        ${data.finishedAt},
        ${JSON.stringify(data.exercises)},
        ${data.xpEarned},
        ${JSON.stringify(data.breakdown)},
        ${JSON.stringify(data.prs)}
      )
      on conflict (id) do nothing
    `;
});
var replaceGymWorkouts_createServerFn_handler = createServerRpc({
	id: "1ab9367f35fe0ab1ba913e3d349bfbefeec7d6701101a6affa3f1e42cde95052",
	name: "replaceGymWorkouts",
	filename: "src/lib/gym-api.ts"
}, (opts) => replaceGymWorkouts.__executeServer(opts));
var replaceGymWorkouts = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(replaceGymWorkouts_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await sql`delete from gym_workouts where user_id = ${context.userId}`;
	for (const w of data) await sql`
        insert into gym_workouts (
          id, user_id, name, started_at, finished_at, exercises_json, xp_earned, breakdown_json, prs_json
        )
        values (
          ${w.id},
          ${context.userId},
          ${w.name},
          ${w.startedAt},
          ${w.finishedAt},
          ${JSON.stringify(w.exercises)},
          ${w.xpEarned},
          ${JSON.stringify(w.breakdown)},
          ${JSON.stringify(w.prs)}
        )
      `;
});
var clearGymCloud_createServerFn_handler = createServerRpc({
	id: "6ed4ca5135cece7019af9c92b97351e160410a1f832b01b7c8cd2b89b9e4c3e4",
	name: "clearGymCloud",
	filename: "src/lib/gym-api.ts"
}, (opts) => clearGymCloud.__executeServer(opts));
var clearGymCloud = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(clearGymCloud_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await sql`delete from gym_workouts where user_id = ${context.userId}`;
	await sql`delete from gym_profiles where user_id = ${context.userId}`;
});
//#endregion
export { clearGymCloud_createServerFn_handler, loadGymState_createServerFn_handler, replaceGymWorkouts_createServerFn_handler, saveGymSnapshot_createServerFn_handler, saveGymWorkout_createServerFn_handler };
