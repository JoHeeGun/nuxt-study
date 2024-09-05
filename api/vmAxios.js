import axios from 'axios'
import { useUserStore } from '~/store/user';

const vmAxios = axios.create({
	withCredentials: true,
	timeout: 6000 * 5, // 요청응답 타임아웃 설정
})

// api baseurl 설정
vmAxios.defaults.baseURL = "https://api-dev.vimeal.kr/api/v1";

// headers req 설정
vmAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
vmAxios.defaults.headers.post['Content-Type'] = 'application/json';
vmAxios.defaults.headers.get['Content-Type'] = 'application/json';
vmAxios.defaults.headers.put['Content-Type'] = 'application/json';
vmAxios.defaults.headers.delete['Content-Type'] = 'application/json';


// 요청 인터셉터 추가
vmAxios.interceptors.request.use( 
	(config) => {
		// api 토큰 설정
		let access_token = useUserStore().token || '';
		if(access_token){
			config.headers.Authorization = access_token;
		}
		return config;
	}
)

let startLogOut = false;

// 응답 인터셉터 추가
vmAxios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (err) {
		// 응담 타임아웃 설정
		if(err.message.includes('timeout')){
			alert('응답 요청에 실패하였습니다.\n다시 시도해 주세요')
		}
		return Promise.reject(err);
	}
);

export { vmAxios }