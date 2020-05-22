import 'xe-utils';
import VXETable from 'vxe-table';

Vue.use(VXETable);
VXETable.setup({
    size: 'mini',
    stripe: true,
    border: true,
    resizable: true,
    keepSource: true,
    pager: {
        background: true,
        pageSizes: [10, 30, 50, 100],
        layouts: ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']
    },
    icon: {
        sortAsc: 'iconfont icon-caret-up',
        sortDesc: 'iconfont icon-caret-down'
    },
})

