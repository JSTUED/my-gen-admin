export default {
    data(){
        return {
            orginSearchForm: {},
            pagination:{
                totalItemsCount: 0,
                pageSize: 30,
                currentPage: 1,
                totalPages: 0,
                background: true
            },
            tableForm: {},
            loading: false,
            tableData: [],
        }
    },

    created() {
        this.$nextTick(()=>{
            this.tableForm = _.cloneDeep(this.searchForm);
            this.orginSearchForm = _.cloneDeep(this.searchForm);
        })
    },

    methods: {
        // 初始化searchForm
        resetSearch(){
            this.searchForm = _.cloneDeep(this.orginSearchForm);
        },

        // 分页发生改变事件
        handlePageChange ({ currentPage, pageSize }) {
            this.pagination.currentPage = currentPage
            this.pagination.pageSize = pageSize
            this.findList()
        },

        // 搜索按钮点击事件
        search(callback) {
            this.tableForm = _.cloneDeep(this.searchForm);
            // 回调处理参数
            if(callback) callback();
            this.pagination.currentPage = 1;
            this.findList();
        },

        // 获取列表数据
        findList (callback) {
            this.loading = true;
            this.getList({
                pagination: this.pagination, // 分页
                ...this.tableForm  // 查询数据
            }).then(res => {
                // 使用回调自定义数据处理
                if(callback){
                    callback(res);
                    this.loading = false;
                    return false;
                }
                // 没有回调时默认处理
                let data = res.data;
                console.log(res, data);
                if(data.code == 200 && !data.isError){
                    let { pagination, list } = data.data;
                    this.tableData = list;
                    this.pagination.totalItemsCount = pagination.totalItemsCount;
                    // console.log(list);
                }
                this.loading = false;
            }).catch(e => {
                this.loading = false;
            })
        },
    }
}
