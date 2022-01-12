import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TextInput,
  StatusBar
} from 'react-native';
import { icons, images } from '../../../../constants';

export default function AboutUs({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='#FFE8D1'
        barStyle='dark-content' />
      <View style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
      <View style={{ backgroundColor: '#FFE8D1', height: 48, flexDirection: 'row' }}>
        <TouchableOpacity style={{ width: '15%' }} onPress={() => navigation.goBack()}>
            <Image source={icons.ArrowLeft1} style={{ height: 32, width: 32, left: 8, top: 6 }} />
        </TouchableOpacity>
        </View>
        <View style={{ width: '70%', marginTop: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black', top: 3 }}>Về Chúng Tôi</Text>
        </View>
        <TouchableOpacity style={{ width: '15%', left: 20, top: 10 }} onPress={() => navigation.popToTop()}>
            <Image style={{ height: 26, width: 26 }} source={icons.Home} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
          <Text style={{ fontWeight: '500', color: 'black', fontSize: 19, lineHeight: 22, textAlign: 'justify', paddingHorizontal: 20, }}>TỔNG QUAN VỀ TỔNG CÔNG TY BƯU ĐIỆN</Text>
          <Text style={{ fontWeight: '500', color: 'black', fontSize: 19, lineHeight: 22, textAlign: 'justify', paddingHorizontal: 15 }}>VIỆT NAM (VIETNAM POST)</Text>
          <Image
            style={{ height: 236, width: '90%', marginTop: 20, borderRadius: 10, marginBottom: 30 }}
            source={images.Vechungtoi}
          />
        </View>

        <View style={{ padding: 15 }}>
          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>Tên giao dịch: Tổng công ty Bưu điện Việt Nam</Text>
          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>Tên viết tắt: Bưu điện Việt Nam</Text>
          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>Tên giao dịch quốc tế: Vietnam Post</Text>
          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 26, color: 'black' }}>Tên viết tắt quốc tế: VNPost</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>1. Cơ cấu tổ chức:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>Tổng công ty Bưu điện Việt Nam được hình thành trên cơ sở triển khai Đề án thí điểm hình thành Tập đoàn Bưu chính Viễn thông Việt Nam (Tập đoàn VNPT) do Thủ tướng Chính phủ phê duyệt tại Quyết định số 58/2005/QĐ-TTg ngày 23/3/2005.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Ngày 01/6/2007 Thủ tướng Chính phủ đã ban hành Quyết định 674/QĐ-TTg ngày 01/6/2007 về phê duyệt Đề án thành lập Tổng công ty Bưu chính Việt Nam. Theo đó Tổng công ty Bưu chính Việt Nam là Tổng công ty nhà nước, do Nhà nước thành lập, hoạt động chuyên về lĩnh vực Bưu chính, hạch toán kinh tế độc lập và được Nhà nước giao vốn thông qua Tập đoàn, Hội đồng thành viên Tập đoàn VNPT là đại diện chủ sở hữu Nhà nước tại Tổng công ty và là Hội đồng thành viên của Tổng công ty. Thực hiện Quyết định 674/QĐ-TTg của Thủ tướng Chính phủ, ngày 15/6/2007 Bộ Bưu chính Viễn Thông (nay là Bộ Thông tin và Truyền thông) đã ban hành Quyết định số 16/2007/QĐ-TCCB-BBCVT về việc thành lập Tổng công ty Bưu chính Việt Nam.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Ngày 16/11/2012 Thủ tướng Chính phủ đã ban hành Quyết định số 1746/QĐ-TTg về việc chuyển quyền đại diện chủ sở hữu nhà nước tại Tổng công ty Bưu chính Việt Nam từ Tập đoàn Bưu chính Viễn thông Việt Nam về Bộ Thông tin và Truyền thông. Tổng công ty Bưu chính Việt Nam được đổi tên thành Tổng công ty Bưu điện Việt Nam (theo Quyết định số 2596/QĐ-BTTTT ngày 28/12/2012 của Bộ Thông tin và Truyền thông).</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Ngày 06/01/2015 Bộ Thông tin và Truyền thông đã Ban hành Quyết định số 09/QĐ-BTTTT về việc tổ chức lại Công ty mẹ Tổng công ty Bưu điện Việt Nam theo đó mô hình tổ chức quản lý của Tổng công ty gồm Hội đồng thành viên và Ban Tổng giám đốc, phù hợp với Nghị định số 69/2014/NĐ-CP của Chính phủ. Bộ máy quản lý điều hành của Tổng công ty theo mô hình tổ chức mới đến nay cũng đã được kiện toàn.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Cơ cấu tổ chức của Vietnam Post: 68 đơn vị hoạch toán phụ thuộc (gồm 63 Bưu điện tỉnh, thành phố, Công ty PHBC Trung ương, Công ty Datapost, Công ty Vận chuyển và Kho vận, Trung tâm Đào tạo, Công ty Tem Bưu chính); 01 Công ty TNHH một thành viên do Tổng công ty nắm giữ 100% vốn điều lệ; 3 công ty cổ phần do Tổng công ty nắm giữ trên 50% vốn điều lệ và 3 Công ty liên kết.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Vốn điều lệ: 8.122 tỷ đồng</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>- Tổng nhân sự trên toàn mạng lưới: hơn 70.000 người (bao gồm cả cộng tác viên và đại lý).</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>2. Hệ thống mạng lưới:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>- Hệ thống điểm phục vụ: hơn 13.000 điểm, bán kính phục vụ bình quân đạt 2,93 km/điểm đảm bảo mỗi xã có tối thiểu một điểm phục vụ, số dân phục vụ bình quân đạt hơn 7.100 người/điểm.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>Trong đó:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>+ 64 bưu cục giao dịch cấp 1;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>+ 760 bưu cục giao dịch cấp 2;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>+ 1.793 bưu cục giao dịch cấp 3;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>+ 8.184 Bưu điện - Văn hóa xã (BĐ-VHX);</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>+ 434 đại lý bưu điện;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 3, color: 'black' }}>+ 43 Kiốt;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>+ 1.460 thùng thư công cộng độc lập;</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>3. Mạng vận chuyển:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Mạng đường thư cấp 1 hiện có 62 đường thư chuyên ngành và phụ trợ, hàng ngày tổ chức 120 chuyến thư với tổng số gần 41.000 km xe lăn bánh/ngày và 3 đường thư xã hội thực hiện vận chuyển giữa các trung tâm khai thác vùng với các trung tâm khai thác tỉnh; 22 đường thư máy bay vận chuyển bưu gửi KT1 và KT3, giao nhận với 7 sân bay trong nước; 32 đường thư máy bay vận chuyển bưu gửi EMS, giao nhận với 14 sân bay trong nước.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Mạng đường thư cấp 2 thực hiện vận chuyển giữa các trung tâm khai thác tỉnh và các huyện với 380 tuyến đường thư, tổng chiều dài 28.000 km, giao nhận với gần 1.600 bưu cục.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>- Mạng đường thư cấp 3: gần 3.600 tuyến đường thư, tổng chiều dài 72.000 km.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>- Mạng đường thư quốc tế gồm 87 đường thư (trong đó: 83 đường bay, 01 tuyến đường thư thuỷ, 03 tuyến đường bộ và đường ô tô chuyên ngành trao đổi trực tiếp với khoảng 200 quốc gia và vùng lãnh thổ).</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>4. Hệ thống khai thác:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>Hiện có 5 bưu cục khai thác quốc tế thực hiện khai thác bưu gửi đi và đến quốc tế (02 Bưu cục Ngoại dịch đặt tại Hà Nội và TP Hồ Chí Minh, 01 Bưu cục kiểm quan đặt tại Đà Nẵng, 2 Bưu cục cửa khẩu đặt tại Lào Cai, Lạng Sơn); 3 Trung tâm khai thác chia chọn vùng miền Bắc, miền Trung, miền Nam đặt tại Hà Nội, Đà Nẵng, TP Hồ Chí Minh; 3 trung tâm khai thác báo chí liên tỉnh tại Hà Nội, thành phố Hồ Chí Minh và Đà Nẵng, 8 điểm in báo phân phối liên tỉnh đặt tại Điện Biên, Nghệ An, Bình Định, Đắc Lắc, Cần Thơ, Hà Nội, Hồ Chí Minh, Đà Nẵng; 78 bưu cục khai thác cấp 1 (17 Bưu cục khai thác vùng, 61 Bưu cục khai thác trung tâm tỉnh, thành phố) đảm nhiệm khai thác cấp vùng, trung tâm tỉnh/thành phố; 597 bưu cục khai thác cấp 2 đảm nhận phần khai thác cấp quận, huyện, khu vực.</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>5. Hệ thống phát</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>Tại các Bưu điện trung tâm tỉnh, huyện, khu vực đã thành lập 655 Bưu cục phát và giao nhiệm vụ quản lý tuyến phát cho 817 Bưu cục giao dịch cấp 3 để tổ chức đi phát, thu gom tại địa chỉ khách hàng và quản lý khâu sau phát. Tại các địa bàn trung tâm tỉnh lỵ, huyện lỵ và các xã có gần 11.800 bưu tá thực hiện phát, thu gom bưu gửi và chuyển phát bưu phẩm, bưu kiện từ trung tâm huyện xuống các bưu cục 3, điểm BĐ-VHX với tổng số tuyến phát là 11.900 tuyến.</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>6. Ngành nghề kinh doanh chính:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>(1). Thiết lập, quản lý, khai thác và phát triển mạng bưu chính công cộng, cung cấp các dịch vụ bưu chính công ích theo chiến lược, quy hoạch, kế hoạch do cơ quan Nhà nước có thẩm quyền phê duyệt;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>(2). Kinh doanh các dịch vụ bưu chính dành riêng theo quy định của cơ quan Nhà nước có thẩm quyền;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>(3). Kinh doanh các dịch vụ bưu chính, phát hành báo chí, chuyển phát trong và ngoài nước;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>(4). Tham gia các hoạt động cung cấp dịch vụ bưu chính quốc tế và các dịch vụ khác trong khuôn khổ các. Điều ước quốc tế trong lĩnh vực bưu chính mà Việt Nam ký kết, gia nhập khi được Nhà nước cho phép;</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>(5). Kinh doanh các ngành, nghề khác theo quy định của pháp luật.</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>Với mạng lưới các điểm phục vụ rộng khắp, trải dài đến tận cấp xã trên cả nước và kinh nghiệm cung cấp các dịch vụ về Bưu chính chuyển phát, các dịch vụ tài chính bưu chính như tiết kiệm bưu điện, chuyển tiền, dịch vụ thu hộ chi hộ, dịch vụ đại lý (đại lý bảo hiểm nhân thọ, phi nhân thọ, đại lý vé điện tử và các dịch vụ đại lý khác)..., Vietnam Post đã khẳng định được ưu thế vượt trội của mình về năng lực phục vụ, sẵn sàng đáp ứng các yêu cầu của khách hàng trên mọi miền của đất nước.</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>7. Hoạt động cộng đồng:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>Là doanh nghiệp chuyển phát duy nhất được Nhà nước đặt hàng cung cấp dịch vụ bưu chính công ích phục vụ sự nghiệp phát triển kinh tế xã hội, xóa đói giảm nghèo, giảm nhẹ thiên tai. Bên cạnh đó Tổng công ty tích cực tham gia các hoạt động cộng đồng như: miễn cước hàng cứu trợ ủng hộ đồng bào Miền Trung; miễn cước gửi bảo trợ cho các Trung tâm nhân đạo, tham gia các hoạt động nhân đạo từ thiện…</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>8. Hợp tác liên doanh:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>Hiện tại, Vietnam Post là thành viên của Tổ chức Liên minh bưu chính thế giới (UPU), có quan hệ hợp tác với Bưu chính của hầu hết các quốc gia trên thế giới. Bên cạnh đó, Vietnam Post cũng là đối tác của nhiều doanh nghiệp lớn trong nước và quốc tế như: Prudential, Jetstar Pacific, Vietnam Airlines, AirMekong, Western Union, Daiichi-life, HSBC, ABBank, BảoViệt Bank, Ngân hàng Quân đội...</Text>

          <Text style={{ fontWeight: '600', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 16, color: 'black' }}>9. Mục tiêu:</Text>
          <Text style={{ fontWeight: '400', fontSize: 17, lineHeight: 22, textAlign: 'justify', marginBottom: 10, color: 'black' }}>Vietnam Post đang nỗ lực phấn đấu trở thành doanh nghiệp cung cấp dịch vụ Bưu chính chuyển phát, Tài chính và Bán lẻ hàng đầu Việt Nam, là sự lựa chọn tốt nhất cho khách hàng.</Text>

        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
}
