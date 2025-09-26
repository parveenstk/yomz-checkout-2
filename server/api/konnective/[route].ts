
import { encryptData } from '~~/server/utils/encryption';
import request from '~~/server/utils/request';

export default defineEventHandler(async (event) => {
    const { method = 'POST' }: { [key: string]: string } = getQuery(event);
    const routeName = event.context.params?.route; // dynamic [route].ts
    const headers = event.headers;
    const body = await readBody(event);
    const encrypt = headers.has('x-encrypt');

    try {
        const data = await request(method.toLowerCase() as any, routeName!, body.payload || {});

        return encrypt ? { encrypted: true, data: encryptData(data) } : { encrypted: false, data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});
